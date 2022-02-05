/* eslint-disable import/no-cycle */
import {
  checkPassword,
  errorsInPassword,
  generateErrorMessage,
  getData,
  getFilter,
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
import config from "../Config/config.js";

function signUp(args) {
  return new Promise((resolve, reject) => {
    const { password, confirmPassword, username } = args;
    const validUsername = getDataFromDatabaseByFilter(
      config.db.table.validUsername,
      "username",
      username
    );

    const userObject = getDataFromDatabaseByFilter(
      config.db.table.user,
      "username",
      username
    );

    Promise.all([validUsername, userObject])
      .then((data) => {
        return validateSignUp(data[0], data[1], password, confirmPassword);
      })
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
        updateData(config.db.table.user, user.data);
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
        type: config.responseType.error,
      });
    }

    if (isNull(user) || !isUserDeativated(user)) {
      reject(
        getResponseObject(
          "User already exists and has an active account.",
          400,
          config.responseType.error
        )
      );
    }

    if (!checkPassword(password, confirmPassword)) {
      reject(
        getResponseObject(
          "Passwords did not match.",
          400,
          config.responseType.error
        )
      );
    }

    validatePassword(password)
      .then((validation) => {
        if (!isValidPassword(validation)) {
          const errors = errorsInPassword(validation);
          const message = generateErrorMessage(errors);
          return reject(
            getResponseObject(message, 400, config.responseType.error)
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
  return new Promise((resolve, reject) => {
    const filter = getFilter({
      key,
      operator: "==",
      value,
    });
    getDataByFilter(table, filter)
      .then((data) => {
        if (data == null) {
          resolve([]);
        }
        resolve(data[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getNextID() {
  return new Promise((resolve, reject) => {
    getData(config.db.table.user)
      .then((users) => {
        resolve(nextID(users));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updateExistingUser(existingUser, hashedPassword) {
  existingUser.password = hashedPassword;
  existingUser.state = profileState.active.value;
  const user = profileCreator();
  user.updateData(existingUser);
  return user;
}

function updateNewUser(username, hashedPassword, permission) {
  return new Promise((resolve, reject) => {
    getNextID()
      .then((id) => {
        const user = profileCreator();
        user.updateData({
          id,
          username,
          permission,
          password: hashedPassword,
          state: profileState.active.value,
        });
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

export { signUp };
