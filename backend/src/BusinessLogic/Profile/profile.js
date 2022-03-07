import {
  hashPassword,
  checkPassword,
  validatePassword,
  isValidPassword,
  errorsInPassword,
  generateErrorMessage,
  createObjectTemplate,
} from "../../internal.js";

const profileState = {
  deactivated: { text: "deactivated", value: 1 },
  active: { text: "active", value: 2 },
  suspended: { text: "suspended", value: 3 },
};

Object.freeze(profileState);

function updateData(profile) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Profile could not be updated because of wrong type of input. Input must be an object."
      );
    }
    Object.keys(args).forEach((key) => {
      profile[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function calculatePoints(challenges) {
  return challenges
    .filter((challenge) => challenge.reward)
    .reduce((points, challenge) => {
      const { reward } = challenge;
      return points + reward.points + reward.bonusPoints;
    }, 0);
}

function getPoints(profile) {
  const functionKey = "getPoints";
  const code = (filter, criteria) => {
    let { challenges } = profile;
    if (filter && criteria) {
      challenges = challenges.filter(
        (challenge) => challenge[filter] === criteria
      );
    }
    return calculatePoints(challenges);
  };

  return createObjectTemplate(functionKey, code);
}

function getPointsByCategory(profile) {
  const func = (category) => {
    const challenges = profile.challenges.filter(
      (challenge) => challenge.categoryID === category.id
    );
    return calculatePoints(challenges);
  };
  return createObjectTemplate("getPointsByCategory", func);
}

function add() {
  const functionKey = "add";
  const code = (list, element) => {
    if (!Array.isArray(list)) {
      throw new Error("The list to add an element to is not an Array.");
    }

    if (!list.includes(element)) {
      list.push(element);
    }
  };

  return createObjectTemplate(functionKey, code);
}

function changePassword(profile) {
  const functionKey = "changePassword";
  const code = (password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      if (!checkPassword(password, confirmPassword)) {
        reject(new Error("The passwords does not match"));
        return;
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
          resolve("Password updated successfully.");
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
      progress: {
        categories: [],
        achievements: [],
      },
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
    ...getPointsByCategory(profile.data),
    ...add(),
    ...changePassword(profile.data),
    ...hasState(profile.data),
    ...deleteProfile(profile.data),
    ...requestUserData(profile.data),
  };
}

export { profileCreator, profileState };
