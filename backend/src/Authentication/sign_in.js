// Server directory imports:
import {
  comparePassword,
  createAccessToken,
  createToken,
  profileState,
} from "../internal.js";
import config from "../Config/config.js";

function signIn(password, user, providers) {
  return new Promise((resolve, reject) => {
    checkProfileState(user)
      .then((userObject) => {
        return Promise.all([
          comparePassword(password, userObject.password),
          userObject,
        ]);
      })
      .then((data) => {
        const result = data[0];
        const userObject = data[1];
        return completeSignIn(result, userObject, providers);
      })
      .then((response) => {
        resolve(response);
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

function completeSignIn(result, user, providers) {
  return new Promise((resolve, reject) => {
    try {
      if (
        result.type === config.responseType.success &&
        result.data.is_matching
      ) {
        const accessToken = createAccessToken(user);
        const refreshToken = createToken(
          user,
          providers.refreshTokens,
          config.secret.refreshToken
        );
        const subscribeToken = createToken(
          user,
          providers.subscribeTokens,
          config.secret.subscribeToken
        );
        if (user.permission === 3) {
          delete user.progress;
        }
        resolve({
          user,
          accessToken,
          refreshToken,
          subscribeToken,
        });
        return;
      }

      reject(
        new Error("Username or password is incorrect. Sign in unsuccessful.")
      );
    } catch (error) {
      reject(error);
    }
  });
}

export { signIn };
