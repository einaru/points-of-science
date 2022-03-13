import { createObjectTemplate } from "../../internal.js";
import { assertTextInput } from "../../API/GraphQL/assert.js";

function emptyData() {
  return {
    data: {
      id: "",
      title: "",
      solution: "",
      reflectionType: 1,
    },
  };
}

function setTitle(reflection) {
  const functionKey = "setTitle";
  const code = (title) => {
    assertTextInput(title, "Reflection title");

    reflection.title = title;
  };

  return createObjectTemplate(functionKey, code);
}

function setSolution(reflection) {
  const functionKey = "setSolution";
  const code = (solution) => {
    assertTextInput(solution, "Reflection solution");

    reflection.solution = solution;
  };

  return createObjectTemplate(functionKey, code);
}

function addChoice(argument) {
  const functionKey = "addChoice";
  const code = (choice) => {
    assertTextInput(choice, "Argument choices");
    argument.choices.push(choice);
  };

  return createObjectTemplate(functionKey, code);
}

function removeChoice(argument) {
  const functionKey = "removeChoice";
  const code = (choice) => {
    if (choice == null) {
      throw new Error(
        "The choice to remove must have a value of type integer."
      );
    }

    if (choice > argument.choices.length - 1) {
      throw new Error("The choice to remove does not exist.");
    }

    argument.choices.splice(choice, 1);
  };

  return createObjectTemplate(functionKey, code);
}

function setReflectionType(reflection) {
  const functionKey = "setReflectionType";
  const code = (reflectionType) => {
    if (typeof reflectionType !== "number") {
      throw new Error("Reflection type must be reflection or argument.");
    }

    reflection.reflectionType = reflectionType;
  };

  return createObjectTemplate(functionKey, code);
}

function addEmptyChoiceList(argument) {
  argument.choices = [];
}

function reflectionCreator() {
  const reflection = emptyData();

  return {
    reflection: {
      ...reflection,
      ...setTitle(reflection.data),
      ...setSolution(reflection.data),
      ...setReflectionType(reflection.data),
    },
  };
}

function argumentCreator() {
  const argument = emptyData();
  addEmptyChoiceList(argument.data);

  return {
    reflection: {
      ...argument,
      ...setTitle(argument.data),
      ...setSolution(argument.data),
      ...addChoice(argument.data),
      ...removeChoice(argument.data),
      ...setReflectionType(argument.data),
    },
  };
}

function reflectionTypeCreator(reflectionType) {
  if (reflectionType === 1) {
    return reflectionCreator();
  }

  return argumentCreator();
}

export { reflectionTypeCreator };
