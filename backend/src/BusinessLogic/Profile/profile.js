import {
  hashPassword,
  checkPassword,
  validatePassword,
  isValidPassword,
  errorsInPassword,
  generateErrorMessage,
} from "../../internal.js";

const profileState = {
  deactivated: { text: "deactivated", value: 1 },
  active: { text: "active", value: 2 },
  suspended: { text: "suspended", value: 3 },
};

Object.freeze(profileState);

function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function updateData(profile) {
  const functionKey = "updateData";
  const code = (args) => {
    // Fill in the blanks
    Object.keys(args).forEach((key) => {
      profile[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function getPoints(profile) {
  const functionKey = "getPoints";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function changePassword(profile) {
  const functionKey = "changePassword";
  const code = (password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      if (!checkPassword(password, confirmPassword)) {
        return reject("The passwords does not match");
      }

      validatePassword(password)
        .then((validation) => {
          if (!isValidPassword(validation)) {
            const errors = errorsInPassword(validation);
            const message = generateErrorMessage(errors);
            return reject(message);
          }

          return hashPassword(password);
        })
        .then((result) => {
          profile.password = result.data.hashedPassword;
          return resolve("Password updated successfully.");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return createObjectTemplate(functionKey, code);
}

function hasState(profile) {
  const functionKey = "hasState";
  const code = (stateText) => {
    // Fill in the blancs
    const stateValue = profileState[stateText].value;
    return profile.state === stateValue;
  };

  return createObjectTemplate(functionKey, code);
}

function deleteProfile(profile) {
  const functionKey = "deleteProfile";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function requestUserData(profile) {
  const functionKey = "requestUserData";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      username: "",
      password: "",
      permission: "",
      achievements: [],
      challenges: [],
      state: profileState.deactivated.value,
    },
  };
}

function profileCreator() {
  const profile = emptyData();

  return {
    ...profile,
    ...updateData(profile.data),
    ...getPoints(profile.data),
    ...changePassword(profile.data),
    ...hasState(profile.data),
    ...deleteProfile(profile.data),
    ...requestUserData(profile.data),
  };
}

export { profileCreator, profileState };
