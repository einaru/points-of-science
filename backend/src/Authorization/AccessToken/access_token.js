/* eslint-disable import/no-cycle */
// Server directory imports:
import jwt from "jsonwebtoken";
import { config, getData, updateData, deleteData } from "../../internal.js";

// Other third party dependencies:

function createAccessToken(user) {
  try {
    const userData = {
      id: user.id,
      name: user.name,
      permission: user.permission,
    };

    return jwt.sign(userData, config.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "900s",
    });
  } catch (error) {
    throw error;
  }
}

function authenticateAccessToken(request) {
  return new Promise((resolve, reject) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken == null) {
      return reject(
        getResponseObject(
          "Access token is missing.",
          403,
          config.env.RESPONSE_TYPE.error
        )
      );
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

function createRefreshToken(user) {
  try {
    const userData = {
      id: user.id,
      name: user.name,
      permission: user.permission,
    };

    const refreshToken = jwt.sign(userData, config.env.REFRESH_TOKEN_SECRET);
    const response = storeRefreshTokenInDatabase(refreshToken);
    if (response.type === "error") {
      throw new Error("Refresh token was not stored in database.");
    }

    return refreshToken;
  } catch (error) {
    throw error;
  }
}

function authenticateRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    const refreshTokens = getData(config.env.REFRESH_TOKEN_TABLE);
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
  });
}

function deleteRefreshTokenFromDatabase(refreshToken) {
  try {
    const refreshTokens = getData(config.env.REFRESH_TOKEN_TABLE);
    if (refreshTokens.length === 0) {
      return getResponseObject(
        "User is already signed out.",
        200,
        config.env.RESPONSE_TYPE.success
      );
    }

    if (!deleteData(config.env.REFRESH_TOKEN_TABLE, refreshToken)) {
      return getResponseObject(
        "Could not sign out user.",
        500,
        config.env.RESPONSE_TYPE.error
      );
    }

    return getResponseObject(
      "User signed out successfully.",
      200,
      config.env.RESPONSE_TYPE.success
    );
  } catch (error) {
    throw error;
  }
}

function storeRefreshTokenInDatabase(refreshToken) {
  try {
    const refreshTokens = getData(config.env.REFRESH_TOKEN_TABLE);
    const refreshTokenExist = refreshTokens.find(
      (token) => token === refreshToken
    );
    if (refreshTokenExist != null) {
      return getResponseObject(
        "Access token already exist.",
        200,
        config.env.RESPONSE_TYPE.success
      );
    }

    updateData(config.env.REFRESH_TOKEN_TABLE, refreshToken);
    return getResponseObject(
      "Access token stored to database successfully.",
      200,
      config.env.RESPONSE_TYPE.success
    );
  } catch (error) {
    throw error;
  }
}

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

export {
  authenticateAccessToken,
  authenticateRefreshToken,
  createAccessToken,
  createRefreshToken,
  deleteRefreshTokenFromDatabase,
};
