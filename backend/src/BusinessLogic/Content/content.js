import { createObjectTemplate, saveData } from "../../internal.js";

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
