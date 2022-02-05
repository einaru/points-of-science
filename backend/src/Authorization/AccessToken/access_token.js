/* eslint-disable import/no-cycle */
// Server directory imports:
import jwt from "jsonwebtoken";
import { getData, updateData, deleteData } from "../../internal.js";
import config from "../../Config/config.js";

// Other third party dependencies:

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

function createAccessToken(user) {
  const userData = {
    id: user.id,
    username: user.username,
    permission: user.permission,
  };

  return jwt.sign(userData, config.secret.accessToken, {
    expiresIn: "900s",
  });
}

function authenticateAccessToken(request) {
  return new Promise((resolve, reject) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken == null) {
      reject(
        getResponseObject(
          "Access token is missing.",
          403,
          config.responseType.error
        )
      );

      return;
    }

    jwt.verify(accessToken, config.secret.accessToken, (error, user) => {
      if (error) {
        return reject(
          getResponseObject(
            "Access token is invalid. It has either expired or is missing.",
            403,
            config.responseType.error
          )
        );
      }

      request.user = user;
      return resolve(
        getResponseObject(
          "Authentication successful.",
          200,
          config.responseType.success
        )
      );
    });
  });
}

function storeRefreshTokenInDatabase(refreshToken) {
  return new Promise((resolve, reject) => {
    getData(config.db.table.refreshToken)
      .then((refreshTokens) => {
        const refreshTokenExist = refreshTokens.find((token) => {
          if (token === Object(token)) {
            return token.id === refreshToken;
          }
          return token === refreshToken;
        });
        if (refreshTokenExist != null) {
          return resolve(
            getResponseObject(
              "Access token already exist.",
              200,
              config.responseType.success
            )
          );
        }

        const data = {
          id: refreshToken,
        };
        return updateData(config.db.table.refreshToken, data);
      })
      .then(() => {
        return resolve(
          getResponseObject(
            "Access token stored to database successfully.",
            200,
            config.responseType.success
          )
        );
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

function createRefreshToken(user) {
  return new Promise((resolve, reject) => {
    try {
      const userData = {
        id: user.id,
        username: user.username,
        permission: user.permission,
        state: user.state,
      };

      const refreshToken = jwt.sign(userData, config.secret.refreshToken);
      storeRefreshTokenInDatabase(refreshToken)
        .then((response) => {
          if (response.type === "error") {
            return reject(
              new Error("Refresh token was not stored in database.")
            );
          }

          return resolve(refreshToken);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function authenticateRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    getData(config.db.table.refreshToken)
      .then((refreshTokens) => {
        const refreshTokenExist = refreshTokens.filter((token) => {
          if (token === Object(token)) {
            return token.id === refreshToken;
          }
          return token === refreshToken;
        });

        if (!refreshTokenExist.length) {
          return reject(
            getResponseObject(
              "Refresh token is invalid.",
              403,
              config.responseType.error
            )
          );
        }

        jwt.verify(
          refreshToken,
          config.secret.refreshToken,
          (error, userVerified) => {
            if (error) {
              return reject(
                getResponseObject(
                  "Refresh token is invalid.",
                  403,
                  config.responseType.error
                )
              );
            }

            return resolve(createAccessToken(userVerified));
          }
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteRefreshTokenFromDatabase(refreshToken) {
  return new Promise((resolve, reject) => {
    getData(config.db.table.refreshToken)
      .then((refreshTokens) => {
        if (refreshTokens.length === 0) {
          return resolve(
            getResponseObject(
              "User is already signed out.",
              200,
              config.responseType.success
            )
          );
        }

        return deleteData(config.db.table.refreshToken, refreshToken);
      })
      .then((response) => {
        if (!response) {
          return reject(
            getResponseObject(
              "Could not sign out user.",
              500,
              config.responseType.error
            )
          );
        }

        return resolve(
          getResponseObject(
            "User signed out successfully.",
            200,
            config.responseType.success
          )
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export {
  authenticateAccessToken,
  authenticateRefreshToken,
  createAccessToken,
  createRefreshToken,
  deleteRefreshTokenFromDatabase,
};
