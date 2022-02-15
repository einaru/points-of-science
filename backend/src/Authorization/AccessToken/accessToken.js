/* eslint-disable import/no-cycle */
// Server directory imports:
import jwt from "jsonwebtoken";
import { getData, updateData, deleteData } from "../../internal.js";
import config from "../../Config/config.js";
import { AuthenticationError } from "../../API/GraphQL/error.js";

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
          reject(new Error("Access token already exist."));
          return;
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
          reject(new AuthenticationError("Refresh token is invalid."));
          return;
        }

        jwt.verify(
          refreshToken,
          config.secret.refreshToken,
          (error, userVerified) => {
            if (error) {
              reject(new AuthenticationError("Refresh token is invalid."));
              return;
            }

            resolve(createAccessToken(userVerified));
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
          reject(new Error("Could not sign out user."));
          return;
        }

        resolve(
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
  authenticateRefreshToken,
  createAccessToken,
  createRefreshToken,
  deleteRefreshTokenFromDatabase,
};
