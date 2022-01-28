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
    const list = getDataByFilter(config.env.VALID_USERNAME_TABLE, {
      key: "username",
      value: username,
    });
    validateSignUp(list[0], password, confirmPassword)
      .then(() => {
        return hashPassword(password);
      })
      .then((result) => {
        return updateUser(
          username,
          result.data.hashedPassword,
          list[0].permission
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

function validateSignUp(data, password, confirmPassword) {
  return new Promise((resolve, reject) => {
    if (isNull(data)) {
      reject({
        message: "Invalid username.",
        status: 400,
        type: config.env.RESPONSE_TYPE.error,
      });
    }

    if (isExistingUser(data.username)) {
      reject(
        getResponseObject(
          "User already exists.",
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

function isExistingUser(username) {
  return (
    getDataByFilter(config.env.USER_TABLE, {
      key: "username",
      value: username,
    }).length > 0
  );
}

function getNextID() {
  const users = getData(config.env.USER_TABLE);
  return nextID(users);
}

function updateUser(username, hashedPassword, permission) {
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
