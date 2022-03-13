import { createObjectTemplate } from "../../internal.js";

function updateContent(content) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Content could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      content[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function contentCreator() {
  const content = {
    data: {
      title: "",
      image: "",
      description: "",
    },
  };

  return {
    content: {
      ...content,
      ...updateContent(content.data),
    },
  };
}

function challengeContentCreator() {
  const content = {
    data: {
      title: "",
      images: [],
      description: "",
    },
  };

  return {
    content: {
      ...content,
      ...updateContent(content.data),
    },
  };
}

export { contentCreator, challengeContentCreator };
