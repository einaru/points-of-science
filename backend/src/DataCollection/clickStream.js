import { createObjectTemplate, deleteData, saveData } from "../internal.js";
import config from "../Config/config.js";

function clickNode() {
  return {
    event: "",
    screen: "",
    timestamp: "",
    metadata: {
      challengeID: "",
      prevScreen: "",
      source: "",
    },
  };
}

function updateClickStream(clickStream) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Click Stream could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      if (key === "clicks") {
        args[key].forEach((click) => {
          const node = clickNode();
          Object.keys(click).forEach((clickKey) => {
            if (clickKey === "metadata") {
              Object.keys(click[clickKey]).forEach((metaDataKey) => {
                node.metadata[metaDataKey] = click[clickKey][metaDataKey];
              });
            } else {
              node[clickKey] = click[clickKey];
            }
          });
          clickStream[key].push(node);
        });
      } else {
        clickStream[key] = args[key];
      }
    });
  };

  return createObjectTemplate(functionKey, code);
}

function deleteClickStream(data) {
  const functionKey = "deleteClickStream";
  const code = (clickStream) => {
    return new Promise((resolve, reject) => {
      if (data == null || clickStream == null) {
        throw new Error("Click stream object or its data is missing.");
      }

      if (clickStream !== Object(clickStream)) {
        throw new Error("Click stream is not an object.");
      }

      clickStream.clickStreamItem
        .deleteClickStreamItem(clickStream.clickStreamItem)
        .then(() => {
          return deleteData(config.db.table.clickStream, data.id);
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      userID: "",
      clicks: [],
    },
  };
}

function clickStreamCreator() {
  const clickStream = emptyData();

  return {
    ...clickStream,
    ...updateClickStream(clickStream.data),
    ...deleteClickStream(clickStream.data),
    ...saveData(),
  };
}

export { clickStreamCreator };
