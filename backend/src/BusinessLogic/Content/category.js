import {
  config,
  contentCreator,
  getDataByFilter,
  getFilter,
  progressCreator,
  updateData,
} from "../../internal.js";

function getResponseObject(message, statusCode, type, data) {
  return {
    message,
    status: statusCode,
    type,
    data,
  };
}

function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function updateCategory(category) {
  const functionKey = "updateData";
  const code = (args) => {
    // Fill in the blanks
    if (args == null) {
      return;
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
      return object.data.id !== challenge.data.id;
    });

    if (!found.length) {
      return "Challenge exist from before.";
    }

    category.challenges.push(challenge);
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

function convertToStoredObject(category) {
  return {
    id: category.data.id,
    challenges: category.data.challenges,
    contentID: category.content.data.id,
    progressID: category.content.data.id,
  };
}

function convertToResponseObject(category) {
  return {
    id: category.data.id,
    challenge: category.data.challenges,
    content: category.content.data,
    progress: category.progress.data,
  };
}

function restoreObject() {
  const functionKey = "restoreObject";
  const code = (category, categoryData) => {
    return new Promise((resolve, reject) => {
      const { contentID, progressID } = categoryData;
      const contentFilter = getFilter({
        key: "id",
        operator: "==",
        value: contentID,
      });
      const progressFilter = getFilter({
        key: "id",
        operator: "==",
        value: progressID,
      });

      const contentData = getDataByFilter(
        config.env.CONTENT_TABLE,
        contentFilter
      );

      const progressData = getDataByFilter(
        config.env.PROGRESS_TABLE,
        progressFilter
      );

      Promise.all([contentData, progressData])
        .then((data) => {
          let content = [];
          let progress = [];

          if (data[0] != null) {
            content = data[0][0];
          }

          if (data[1] != null) {
            [progress] = data[1][0];
          }

          category.updateData(categoryData);
          category.content.updateData(content);
          category.progress.updateData(progress);
          resolve(convertToResponseObject(category));
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return createObjectTemplate(functionKey, code);
}

function saveData() {
  const functionKey = "saveData";
  const code = (category) => {
    return new Promise((resolve, reject) => {
      const storedData = convertToStoredObject(category);
      updateData(config.env.CATEGORY_TABLE, storedData)
        .then(() => {
          resolve(
            getResponseObject(
              "Category stored successfully.",
              200,
              config.env.RESPONSE_TYPE.success,
              convertToResponseObject(category)
            )
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
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

function emptyData() {
  return {
    data: {
      id: 0,
      challenges: [],
    },
  };
}

function categoryCreator() {
  const content = contentCreator();
  const category = emptyData();
  const progress = progressCreator();

  return {
    ...content,
    ...progress,
    ...category,
    ...updateCategory(category.data),
    ...addChallenge(category.data),
    ...removeChallenge(category.data),
    ...restoreObject(),
    ...saveData(),
    ...deleteCategory(category.data),
  };
}

export { categoryCreator };
