/* eslint-disable import/no-cycle */
// Server directory imports:
import jwt from "jsonwebtoken";
import { config, getData, updateData, deleteData } from "../../internal.js";

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
    name: user.name,
    permission: user.permission,
  };

  return jwt.sign(userData, config.env.ACCESS_TOKEN_SECRET, {
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
          config.env.RESPONSE_TYPE.error
        )
      );

      return;
    }

    jwt.verify(accessToken, config.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return reject(
          getResponseObject(
            "Access token is invalid. It has either expired or is missing.",
            403,
            config.env.RESPONSE_TYPE.error
          )
        );
      }

      request.user = user;
      return resolve(
        getResponseObject(
          "Authentication successful.",
          200,
          config.env.RESPONSE_TYPE.success
        )
      );
    });
  });
}

function storeRefreshTokenInDatabase(refreshToken) {
  return new Promise((resolve, reject) => {
    getData(config.env.REFRESH_TOKEN_TABLE)
      .then((refreshTokens) => {
        const refreshTokenExist = refreshTokens.find(
          (token) => token === refreshToken
        );
        if (refreshTokenExist != null) {
          return resolve(
            getResponseObject(
              "Access token already exist.",
              200,
              config.env.RESPONSE_TYPE.success
            )
          );
        }

        return updateData(config.env.REFRESH_TOKEN_TABLE, refreshToken);
      })
      .then(() => {
        return resolve(
          getResponseObject(
            "Access token stored to database successfully.",
            200,
            config.env.RESPONSE_TYPE.success
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

      const refreshToken = jwt.sign(userData, config.env.REFRESH_TOKEN_SECRET);
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
    getData(config.env.REFRESH_TOKEN_TABLE)
      .then((refreshTokens) => {
        if (!refreshTokens.includes(refreshToken)) {
          return reject(
            getResponseObject(
              "Refresh token is invalid.",
              403,
              config.env.RESPONSE_TYPE.error
            )
          );
        }

        jwt.verify(
          refreshToken,
          config.env.REFRESH_TOKEN_SECRET,
          (error, userVerified) => {
            if (error) {
              return reject(
                getResponseObject(
                  "Refresh token is invalid.",
                  403,
                  config.env.RESPONSE_TYPE.error
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
    getData(config.env.REFRESH_TOKEN_TABLE)
      .then((refreshTokens) => {
        if (refreshTokens.length === 0) {
          return resolve(
            getResponseObject(
              "User is already signed out.",
              200,
              config.env.RESPONSE_TYPE.success
            )
          );
        }

        return deleteData(config.env.REFRESH_TOKEN_TABLE, refreshToken);
      })
      .then((response) => {
        if (!response) {
          return reject(
            getResponseObject(
              "Could not sign out user.",
              500,
              config.env.RESPONSE_TYPE.error
            )
          );
        }

        return resolve(
          getResponseObject(
            "User signed out successfully.",
            200,
            config.env.RESPONSE_TYPE.success
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
