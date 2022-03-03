/* eslint-disable import/no-cycle */
// Server directory imports:
import jwt from "jsonwebtoken";
import config from "../../Config/config.js";
import { AuthenticationError } from "../../API/GraphQL/error.js";

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

function storeRefreshTokenInDatabase(refreshToken, providers) {
  return new Promise((resolve, reject) => {
    providers.refreshTokens
      .getAll()
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
        return providers.refreshTokens.update(data.id, data);
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

function createRefreshToken(user, providers) {
  return new Promise((resolve, reject) => {
    try {
      const userData = {
        id: user.id,
        username: user.username,
        permission: user.permission,
        state: user.state,
      };

      const refreshToken = jwt.sign(userData, config.secret.refreshToken);
      storeRefreshTokenInDatabase(refreshToken, providers)
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

async function authenticateRefreshToken(refreshToken, refreshTokens) {
  const refreshTokenExist = refreshTokens.filter((token) => {
    if (token === Object(token)) {
      return token.id === refreshToken;
    }
    return token === refreshToken;
  });

  if (!refreshTokenExist.length) {
    throw new AuthenticationError("Refresh token is invalid.");
  }

  try {
    const verifiedUser = jwt.verify(refreshToken, config.secret.refreshToken);
    return createAccessToken(verifiedUser);
  } catch (error) {
    throw new AuthenticationError("Refresh token is invalid.");
  }
}

export { authenticateRefreshToken, createAccessToken, createRefreshToken };
