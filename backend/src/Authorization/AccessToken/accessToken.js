/* eslint-disable import/no-cycle */
// Server directory imports:
import jwt from "jsonwebtoken";
import config from "../../Config/config.js";
import { AuthenticationError } from "../../API/GraphQL/error.js";

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

function storeTokenInDatabase(token, provider, userID) {
  return new Promise((resolve, reject) => {
    provider
      .getAll()
      .then((tokens) => {
        const tokenExist = tokens.find((element) => {
          if (element === Object(element)) {
            return element.id === token;
          }
          return element === token;
        });
        if (tokenExist != null) {
          reject(new Error("Token already exist."));
          return;
        }

        const data = {
          id: token,
          userID,
          created: Date.now().valueOf().toString(),
        };
        return provider.update(data.id, data);
      })
      .then(() => {
        return resolve("success");
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

function createToken(user, provider, secret) {
  return new Promise((resolve, reject) => {
    try {
      const userData = {
        id: user.id,
        username: user.username,
        permission: user.permission,
        state: user.state,
      };

      const token = jwt.sign(userData, secret);
      storeTokenInDatabase(token, provider, user.id)
        .then((response) => {
          if (response === "error") {
            return reject(new Error("Token was not stored in database."));
          }

          return resolve(token);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export { authenticateRefreshToken, createAccessToken, createToken };
