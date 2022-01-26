function reflectionCreator() {
  const reflection = emptyData();

  return {
    reflection: {
      ...reflection,
      ...setTitle(reflection.data),
      ...setSolution(reflection.data),
      ...deleteReflection(reflection.data),
    },
  };
}

function argumentCreator() {
  const argument = emptyData();
  addEmptyChoiceList(argument);

  return {
    reflection: {
      ...argument,
      ...setTitle(argument.data),
      ...setSolution(argument.data),
      ...addChoice(argument.data),
      ...removeChoice(argument.data),
      ...deleteReflection(argument.data),
    },
  };
}

function setTitle(reflection) {
  const key = "setTitle";
  const code = (title) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function setSolution(reflection) {
  const key = "setSolution";
  const code = (solution) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function addChoice(argument) {
  const key = "addChoice";
  const code = (choice) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function removeChoice(argument) {
  const key = "removeChoice";
  const code = (choice) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function deleteReflection(reflection) {
  const key = "deleteReflection";
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
      solution: "",
    },
  };
}

function addEmptyChoiceList(argument) {
  argument.data.choices = [];
}

export { reflectionCreator, argumentCreator };
