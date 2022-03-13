import {
  challengeCreator,
  contentCreator,
  createObjectTemplate,
} from "../../internal.js";

function updateCategory(category) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Category could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      category[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function addChallenge(category) {
  const functionKey = "addChallenge";
  const code = (challenge) => {
    if (challenge === null) {
      throw new Error("Challenge had value null. Please input a challenge.");
    }

    const found = category.challenges.filter((object) => {
      return object.data.id === challenge.data.id;
    });

    if (found.length > 0) {
      return "Challenge exist from before.";
    }

    category.challenges.push(challenge);
    return "Challenge successfully added.";
  };

  return createObjectTemplate(functionKey, code);
}

function removeChallenge(category) {
  const functionKey = "removeChallenge";
  const code = (challenge) => {
    if (challenge === null) {
      throw new Error("Challenge had value null. Please input a challenge.");
    }

    const challengeIDs = category.challenges.map((object) => {
      return object.data.id;
    });

    const position = challengeIDs.indexOf(challenge.data.id);
    if (position === -1) {
      return "Challenge does not exist in this category";
    }

    category.challenges.splice(position, 1);
    return "Challenge successfully removed.";
  };

  return createObjectTemplate(functionKey, code);
}

function restoreChallenges(data, challengeList) {
  const challengesData = data.filter((challenge) => {
    return challengeList.includes(challenge.id);
  });

  const challenges = [];
  challengesData.forEach((challengeData) => {
    const challenge = challengeCreator(challengeData.reflection.reflectionType);
    challenge.restoreObject(challenge, challengeData);
    challenges.push(challenge);
  });

  return challenges;
}

function restoreObject() {
  const functionKey = "restoreObject";
  const code = (category, categoryData, storedChallenges) => {
    const { challenges } = categoryData;
    const challengeList = restoreChallenges(storedChallenges, challenges);

    if (challengeList.length > 0) {
      categoryData.challenges = challengeList;
    }

    category.content.updateData(categoryData.content);
    category.updateData(categoryData);
  };

  return createObjectTemplate(functionKey, code);
}

function deleteCategory(category) {
  const functionKey = "deleteCategory";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function convertToResponseObject() {
  const functionKey = "convertToResponseObject";
  const code = (object) => {
    return {
      id: object.data.id,
      challenges: object.data.challenges,
      name: object.content.data.title,
      description: object.content.data.description,
      image: object.content.data.image,
    };
  };

  return createObjectTemplate(functionKey, code);
}

function convertToStoredObject() {
  const functionKey = "convertToStoredObject";
  const code = (object) => {
    return {
      id: object.data.id,
      challenges: object.data.challenges.map((item) => item.data.id),
      content: object.content.data,
    };
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      challenges: [],
    },
  };
}

function categoryCreator() {
  const content = contentCreator();
  const category = emptyData();

  return {
    ...content,
    ...category,
    ...updateCategory(category.data),
    ...addChallenge(category.data),
    ...removeChallenge(category.data),
    ...convertToResponseObject(),
    ...convertToStoredObject(),
    ...restoreObject(),
    ...deleteCategory(category.data),
  };
}

export { categoryCreator };
