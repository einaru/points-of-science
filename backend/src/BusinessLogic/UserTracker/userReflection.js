import { createObjectTemplate } from "../../internal.js";

const VoteEnum = Object.freeze({ neutral: -1, up: 1, down: 2 });

function updateData(userReflection) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "User reflection could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      userReflection[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function vote(userReflection) {
  const functionKey = "vote";
  const code = (vote) => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      userID: "",
      reflectionID: "",
      date_started: "0000-00-00T00:00:00.000Z",
      date_completed: "0000-00-00T00:00:00.000Z",
      answer: "",
      vote: -1,
      vote_choices: VoteEnum,
    },
  };
}

function userReflectionCreator() {
  const userReflection = emptyData();

  return {
    ...userReflection,
    ...updateData(userReflection.data),
    ...vote(userReflection.data),
  };
}

export { userReflectionCreator };
