import {
  checkPassword,
  config,
  errorsInPassword,
  generateErrorMessage,
  getData,
  getDataByFilter,
  hashPassword,
  isValidPassword,
  nextID,
  profileCreator,
  profileState,
  signIn,
  updateData,
  validatePassword,
} from "../internal.js";

function signUp(args) {
  return new Promise((resolve, reject) => {
    const { password, confirmPassword, username } = args;
    const validUsername = getDataFromDatabaseByFilter(
      config.env.VALID_USERNAME_TABLE,
      "username",
      username
    );

    const userObject = getDataFromDatabaseByFilter(
      config.env.USER_TABLE,
      "username",
      username
    );

    validateSignUp(validUsername, userObject, password, confirmPassword)
      .then(() => {
        return hashPassword(password);
      })
      .then((result) => {
        if (!isNull(userObject)) {
          return updateExistingUser(userObject, result.data.hashedPassword);
        }

        return updateNewUser(
          username,
          result.data.hashedPassword,
          validUsername.permission
        );
      })
      .then((user) => {
        updateData(config.env.USER_TABLE, user.data);
        return signIn(user.data.username, password);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function validateSignUp(data, user, password, confirmPassword) {
  return new Promise((resolve, reject) => {
    if (isNull(data)) {
      reject({
        message: "Invalid username.",
        status: 400,
        type: config.env.RESPONSE_TYPE.error,
      });
    }

    if (isNull(user) || !isUserDeativated(user)) {
      reject(
        getResponseObject(
          "User already exists and has an active account.",
          400,
          config.env.RESPONSE_TYPE.error
        )
      );
    }

    if (!checkPassword(password, confirmPassword)) {
      reject(
        getResponseObject(
          "Passwords did not match.",
          400,
          config.env.RESPONSE_TYPE.error
        )
      );
    }

    validatePassword(password)
      .then((validation) => {
        if (!isValidPassword(validation)) {
          const errors = errorsInPassword(validation);
          const message = generateErrorMessage(errors);
          return reject(
            getResponseObject(message, 400, config.env.RESPONSE_TYPE.error)
          );
        }

        return resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function isNull(data) {
  return data == null;
}

function isUserDeativated(user) {
  return user.state === profileState.deactivated.value;
}

function getDataFromDatabaseByFilter(table, key, value) {
  return getDataByFilter(table, {
    key,
    value,
  })[0];
}

function getNextID() {
  const users = getData(config.env.USER_TABLE);
  return nextID(users);
}

function updateExistingUser(existingUser, hashedPassword) {
  existingUser.password = hashedPassword;
  existingUser.state = profileState.active.value;
  const user = profileCreator();
  user.updateData(existingUser);
  return user;
}

function updateNewUser(username, hashedPassword, permission) {
  const id = getNextID();
  const user = profileCreator();
  user.updateData({
    id,
    username,
    permission,
    password: hashedPassword,
    state: profileState.active.value,
  });
  return user;
}

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

export { signUp };
