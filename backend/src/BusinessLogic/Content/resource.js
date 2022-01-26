function resourceCreator() {
  const resource = emptyData();

  return {
    resource: {
      ...resource,
      ...updateData(resource),
      ...deleteResource(resource.data),
    },
  };
}

function updateData(resource) {
  const key = "updateData";
  const code = (args) => {
    // Fill in the blanks
    for (const [key, value] of Object.entries(args)) {
      resource[key] = value;
    }
  };

  return createObjectTemplate(key, code);
}

function deleteResource(resource) {
  const key = "deleteResource";
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
      url: "",
    },
  };
}

export { resourceCreator };
