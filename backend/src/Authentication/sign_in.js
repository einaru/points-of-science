/* eslint-disable import/no-cycle */
/* eslint-disable no-promise-executor-return */
// Server directory imports:
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  getData,
  profileState,
} from "../internal.js";
import config from "../Config/config.js";

function signIn(username, password) {
  return new Promise((resolve, reject) => {
    getUser(username)
      .then((user) => {
        return checkProfileState(user);
      })
      .then((user) => {
        return Promise.all([comparePassword(password, user.password), user]);
      })
      .then((data) => {
        const result = data[0];
        const user = data[1];
        return completeSignIn(result, user);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        // TO-DO: Implement error handler to take care of the error and provide a proper response to the user.
        reject(error);
      });
  });
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    getData(config.db.table.user)
      .then((users) => {
        const user = users.find((user) => user.username === username);
        if (user == null) {
          reject(new Error("User not found. Sign in unsuccessful."));
          return;
        }

        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function checkProfileState(user) {
  return new Promise((resolve, reject) => {
    if (
      user.state === profileState.deactivated.value ||
      user.state === profileState.suspended.value
    ) {
      reject(new Error(`The profile is deactivated or suspended.`));
      return;
    }

    resolve(user);
  });
}

function completeSignIn(result, user) {
  return new Promise((resolve, reject) => {
    if (
      result.type === config.responseType.success &&
      result.data.is_matching
    ) {
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);
      return resolve({
        user,
        accessToken,
        refreshToken,
      });
    }

    return reject(
      new Error("Username or password is incorrect. Sign in unsuccessful.")
    );
  });
}

export { signIn };
