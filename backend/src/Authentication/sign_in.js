/* eslint-disable import/no-cycle */
/* eslint-disable no-promise-executor-return */
// Server directory imports:
import {
  config,
  comparePassword,
  createAccessToken,
  createRefreshToken,
  getData,
  profileState,
} from "../internal.js";

function getResponseObject(message, statusCode, type, data) {
  return {
    message,
    status: statusCode,
    type,
    data,
  };
}

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
        return reject(
          getResponseObject(
            `Something went wrong during sign in. Sign in unsuccessful. ERROR: ${error.message}`,
            500,
            config.env.RESPONSE_TYPE.error,
            {}
          )
        );
      });
  });
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    getData(config.env.USER_TABLE)
      .then((users) => {
        const user = users.find((user) => user.username === username);
        if (user == null) {
          return reject(
            getResponseObject(
              "User not found. Sign in unsuccessful.",
              400,
              config.env.RESPONSE_TYPE.error,
              {}
            )
          );
        }

        return resolve(user);
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
      return reject(
        getResponseObject(
          `The profile is deactivated or suspended.`,
          400,
          config.env.RESPONSE_TYPE.error,
          {}
        )
      );
    }

    return resolve(user);
  });
}

function completeSignIn(result, user) {
  return new Promise((resolve, reject) => {
    if (
      result.type === config.env.RESPONSE_TYPE.success &&
      result.data.is_matching
    ) {
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);
      return resolve(
        getResponseObject(
          "Sign in successful.",
          200,
          config.env.RESPONSE_TYPE.success,
          {
            user,
            accessToken,
            refreshToken,
          }
        )
      );
    }

    return reject(
      getResponseObject(
        "Username or password is incorrect. Sign in unsuccessful.",
        401,
        config.env.RESPONSE_TYPE.error,
        {}
      )
    );
  });
}

export { signIn };
