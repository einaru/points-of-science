import { config, updateData } from "../../internal.js";

function getResponseObject(message, statusCode, type, data) {
  return {
    message,
    status: statusCode,
    type,
    data,
  };
}

function emptyData() {
  return {
    data: {
      id: 0,
      title: "",
      image: "",
      description: "",
    },
  };
}

function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function updateContent(content) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null && args !== Object(args)) {
      throw new Error(
        "Content could not be updated because of wrong type of input."
      );
    }

    Object.keys(args).forEach((key) => {
      content[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function convertToStoredObject(content) {
  return {
    id: content.data.id,
    title: content.data.title,
    image: content.data.image,
    description: content.data.description,
  };
}

function convertToResponseObject(content) {
  return {
    id: content.data.id,
    title: content.data.title,
    image: content.data.image,
    description: content.data.description,
  };
}

function saveData() {
  const functionKey = "saveData";
  const code = (content) => {
    return new Promise((resolve, reject) => {
      const storedData = convertToStoredObject(content);
      updateData(config.env.CONTENT_TABLE, storedData)
        .then(() => {
          resolve(
            getResponseObject(
              "Content stored successfully.",
              200,
              config.env.RESPONSE_TYPE.success,
              convertToResponseObject(content)
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

function deleteContent(content) {
  const functionKey = "deleteContent";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function contentCreator() {
  const content = emptyData();

  return {
    content: {
      ...content,
      ...updateContent(content.data),
      ...saveData(),
      ...deleteContent(content.data),
    },
  };
}

export { contentCreator };
