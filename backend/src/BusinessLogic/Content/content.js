function contentCreator() {
  const content = emptyData();

  return {
    content: {
      ...content,
      ...updateData(content.data),
      ...deleteContent(content.data),
    },
  };
}

function updateData(content) {
  const key = "updateData";
  const code = (args) => {
    // Fill in the blanks
    for (const [key, value] of Object.entries(args)) {
      content[key] = value;
    }
  };

  return createObjectTemplate(key, code);
}

function deleteContent(content) {
  const key = "deleteContent";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
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

export { contentCreator };
