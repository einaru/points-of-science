// Server directory imports:
import {
  config,
  comparePassword,
  getData,
  createAccessToken,
  createRefreshToken,
} from "../internal.js";

function signIn(username, password) {
  return new Promise((resolve, reject) => {
    const users = getData(config.env.USER_TABLE);
    const user = users.find((user) => user.name === username);
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

    const storedPassword = user.password;
    comparePassword(password, storedPassword)
      .then((result) => {
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
                access_token: accessToken,
                refresh_token: refreshToken,
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

function getResponseObject(message, statusCode, type, data) {
  return {
    message,
    status: statusCode,
    type,
    data,
  };
}

export { signIn };
