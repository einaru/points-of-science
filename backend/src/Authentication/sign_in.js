// Server directory imports:
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
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
    if (
      result.type === config.responseType.success &&
      result.data.is_matching
    ) {
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user, providers);
      resolve({
        user,
        accessToken,
        refreshToken,
      });
      return;
    }

    reject(
      new Error("Username or password is incorrect. Sign in unsuccessful.")
    );
  });
}

export { signIn };
