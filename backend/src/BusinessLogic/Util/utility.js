import { updateData } from "../../internal.js";
import config from "../../Config/config.js";

function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function getResponseObject(message, statusCode, type, data) {
  return {
    message,
    status: statusCode,
    type,
    data,
  };
}

function convertToStoredObject(key, object) {
  switch (key) {
    case "category":
      return {
        id: object.data.id,
        challenges: object.data.challenges,
        contentID: object.content.data.id,
        progressID: object.content.data.id,
      };
    case "content":
      return {
        id: object.data.id,
        title: object.data.title,
        image: object.data.image,
        description: object.data.description,
      };
    default:
      return {};
  }
}

function convertToResponseObject(key, object) {
  switch (key) {
    case "category":
      return {
        id: object.data.id,
        challenge: object.data.challenges,
        ...object.content.data,
        progress: object.progress.data,
      };
    case "content":
      return {
        id: object.data.id,
        title: object.data.title,
        image: object.data.image,
        description: object.data.description,
      };
    default:
      return {};
  }
}

function saveData() {
  const functionKey = "saveData";
  const code = (key, data, table, message) => {
    return new Promise((resolve, reject) => {
      const storedData = convertToStoredObject(key, data);
      updateData(table, storedData)
        .then(() => {
          resolve(
            getResponseObject(
              message,
              200,
              config.responseType.success,
              convertToResponseObject(key, data)
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

export {
  createObjectTemplate,
  convertToStoredObject,
  convertToResponseObject,
  getResponseObject,
  saveData,
};
