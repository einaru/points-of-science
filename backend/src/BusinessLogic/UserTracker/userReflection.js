import { createObjectTemplate } from "../../internal.js";
import { UserInputError } from "../../API/GraphQL/error.js";

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

function checkAnswer(userReflection) {
  const functionKey = "checkAnswer";
  const code = (reflection) => {
    if (reflection.solution.trim().length === 0) {
      return true;
    }

    return userReflection.answer === reflection.solution;
  };

  return createObjectTemplate(functionKey, code);
}

function vote(userReflection) {
  const functionKey = "vote";
  const code = (data) => {
    if (data == null) {
      throw new UserInputError(
        `Vote must be an integer. A vote can have one of the following values: ${VoteEnum}.`
      );
    }

    userReflection.vote = data;
  };

  return createObjectTemplate(functionKey, code);
}

function isCompleted(userReflection) {
  const functionKey = "isCompleted";
  const code = () => {
    return userReflection.dateCompleted.trim().length >= 0;
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      dateCompleted: "",
      answer: [],
      vote: -1,
    },
  };
}

function userReflectionCreator() {
  const userReflection = emptyData();

  return {
    userReflection: {
      ...userReflection,
      ...updateData(userReflection.data),
      ...checkAnswer(userReflection.data),
      ...vote(userReflection.data),
      ...isCompleted(userReflection.data),
    },
  };
}

export { userReflectionCreator };
