//Server directory imports:
import { config, getData, updateData, deleteData } from "../../internal.js";

//Other third party dependencies:
import jwt from "jsonwebtoken";

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
    return error;
  }
}

function authenticateAccessToken(next) {
  const authHeader = request.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken == null) {
    return { status: 403, type: "error", message: "Access token is missing." };
  }

  jwt.verify(accessToken, config.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return {
        status: 403,
        type: "error",
        message: "Access token is invalid.",
      };
    }

    request.user = user;
    next();
  });
}

function createRefreshToken(user) {
  try {
    const userData = {
      id: user.id,
      name: user.name,
      permission: user.permission,
    };

    const refreshToken = jwt.sign(userData, config.REFRESH_TOKEN_SECRET);
    storeRefreshTokenInDatabase(refreshToken);
    return refreshToken;
  } catch (error) {
    return error;
  }
}

function authenticateRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    const refreshTokens = getData(config.env.REFRESH_TOKEN_TABLE);
    if (!refreshTokens.includes(refreshToken)) {
      return reject({
        status: 403,
        type: "error",
        message: "Refresh token is invalid.",
      });
    }

    jwt.verify(
      refreshToken,
      config.env.REFRESH_TOKEN_SECRET,
      (error, userVerified) => {
        if (error) {
          return reject({
            status: 403,
            type: "error",
            message: "Refresh token is invalid.",
          });
        }

        return resolve(createAccessToken(userVerified));
      }
    );
  });
}

function deleteRefreshTokenFromDatabase(refreshToken) {
  try {
    const refreshTokens = getData(config.env.REFRESH_TOKEN_TABLE);
    if (refreshTokens.length == 0) {
      return {
        status: 200,
        type: "success",
        message: "User is already signed out.",
      };
    }

    deleteData(config.env.REFRESH_TOKEN_TABLE, refreshToken);
    return {
      status: 200,
      type: "success",
      message: "User signed out successfully.",
    };
  } catch (error) {
    return { status: 400, type: "error", message: error.message };
  }
}

function storeRefreshTokenInDatabase(refreshToken) {
  try {
    const refreshTokens = getData(config.env.REFRESH_TOKEN_TABLE);
    const refreshTokenExist = refreshTokens.find(
      (token) => token == refreshToken
    );
    if (refreshTokenExist != null) {
      return {
        status: 200,
        type: "success",
        message: "Access token already exist.",
      };
    }

    updateData(config.env.REFRESH_TOKEN_TABLE, refreshToken);
    return {
      status: 200,
      type: "success",
      message: "Access token stored to database successfully.",
    };
  } catch (error) {
    return { status: 400, type: "error", message: error.message };
  }
}

export {
  authenticateAccessToken,
  authenticateRefreshToken,
  createAccessToken,
  createRefreshToken,
  deleteRefreshTokenFromDatabase,
};
