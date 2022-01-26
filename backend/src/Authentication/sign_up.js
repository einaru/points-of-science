import {
  profileCreator,
  checkPassword,
  config,
  getData,
  getDataByFilter,
  hashPassword,
  nextID,
  signIn,
  updateData,
  validatePassword,
} from "../internal.js";

function signUp(args) {
  return new Promise((resolve, reject) => {
    const { password, confirmPassword, username } = args;
    validateSignIn(username, password, confirmPassword, reject);

    hashPassword(password)
      .then((result) => {
        return updateUser(username, result.data.hashedPassword);
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

function validateSignIn(username, password, confirmPassword, reject) {
  if (!isValidUsername(username, reject)) {
    return;
  }

  if (isExistingUser(username, reject)) {
    return;
  }

  if (!checkPassword(password, confirmPassword)) {
    throw new Error("Passwords did not match.");
  }

  if (!validatePassword(password)) {
    throw new Error("Password has wrong format.");
  }
}

function isValidUsername(username, reject) {
  const validUsername = getDataByFilter(config.env.VALID_USERNAME_TABLE, {
    key: "username",
    value: username,
  });
  if (validUsername.length === 0) {
    return reject({
      message: "Invalid username.",
      status: 400,
      type: config.env.RESPONSE_TYPE.error,
    });
  }

  return true;
}

function isExistingUser(username, reject) {
  if (
    getDataByFilter(config.env.USER_TABLE, {
      key: "username",
      value: username,
    }).length > 0
  ) {
    reject(
      getResponseObject(
        "User already exists.",
        400,
        config.env.RESPONSE_TYPE.error
      )
    );
    return true;
  }

  return false;
}

function randomizePermission() {
  return 2;
}

function getNextID() {
  const users = getData(config.env.USER_TABLE);
  return nextID(users);
}

function updateUser(username, hashedPassword) {
  const id = getNextID();
  const user = profileCreator();
  const permission = randomizePermission();
  user.updateData({
    id,
    username,
    permission,
    password: hashedPassword,
    active: 2,
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
