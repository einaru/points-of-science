/* eslint-disable import/no-cycle */
import {
  checkPassword,
  errorsInPassword,
  generateErrorMessage,
  hashPassword,
  isValidPassword,
  profileCreator,
  profileState,
  validatePassword,
} from "../internal.js";

function signUp(args, validUsername, userObject) {
  return new Promise((resolve, reject) => {
    const { password, confirmPassword, username } = args;
    validateSignUp(validUsername, userObject, password, confirmPassword)
      .then(() => {
        return hashPassword(password);
      })
      .then((result) => {
        if (!isNull(userObject)) {
          return updateExistingUser(userObject, result.data.hashedPassword);
        }

        return updateNewUser(
          username,
          result.data.hashedPassword,
          validUsername.permission
        );
      })
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function validateSignUp(data, user, password, confirmPassword) {
  return new Promise((resolve, reject) => {
    if (isNull(data)) {
      reject(new Error("Invalid username"));
      return;
    }

    if (isNull(user) || !isUserDeativated(user)) {
      reject(new Error("User already exists and has an active account."));
      return;
    }

    if (!checkPassword(password, confirmPassword)) {
      reject(new Error("Passwords did not match."));
      return;
    }

    validatePassword(password)
      .then((validation) => {
        if (!isValidPassword(validation)) {
          const errors = errorsInPassword(validation);
          const message = generateErrorMessage(errors);
          reject(new Error(message));
          return;
        }

        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function isNull(data) {
  return data == null;
}

function isUserDeativated(user) {
  return user.state === profileState.deactivated.value;
}

function updateExistingUser(existingUser, hashedPassword) {
  existingUser.password = hashedPassword;
  existingUser.state = profileState.active.value;
  const user = profileCreator();
  user.updateData(existingUser);
  return user;
}

function updateNewUser(username, hashedPassword, permission) {
  try {
    const user = profileCreator();
    user.updateData({
      username,
      permission,
      password: hashedPassword,
      state: profileState.active.value,
    });
    return user;
  } catch (error) {
    return error;
  }
}

export { signUp };
