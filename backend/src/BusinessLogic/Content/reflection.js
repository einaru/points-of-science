import config from "../../Config/config.js";
import { createObjectTemplate, deleteData, saveData } from "../../internal.js";
import { assertTextInput } from "../../API/GraphQL/assert.js";

function emptyData() {
  return {
    data: {
      id: "",
      title: "",
      solution: "",
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

function deleteReflection(reflection) {
  const functionKey = "deleteReflection";
  const code = (challenge) => {
    return new Promise((resolve, reject) => {
      if (challenge == null || challenge !== Object(challenge)) {
        reject(
          Error(
            "Challenge to delete this reflection from has wrong type. Input must be an object."
          )
        );
      }

      deleteData(config.db.table.reflection, reflection.id)
        .then((response) => {
          const emptyReflection = emptyData();
          challenge.reflection.data.setTitle(emptyReflection.data.title);
          challenge.reflection.data.solution(emptyReflection.data.solution);
          if (challenge.reflection.data.choices) {
            const { choices } = challenge.reflection.data;
            choices.splice(0, choices.length);
          }

          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
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
      ...deleteReflection(reflection.data),
      ...saveData(),
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
      ...deleteReflection(argument.data),
      ...saveData(),
    },
  };
}

export { reflectionCreator, argumentCreator };
