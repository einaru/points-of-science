import { createObjectTemplate } from "../../internal.js";

import { assertTextInput } from "../../API/GraphQL/assert.js";

function emptyData() {
  return {
    data: {
      id: "",
      type: 1,
      description: "",
      hints: [],
      resources: [],
    },
  };
}

function setID(activity) {
  const functionKey = "setID";
  const code = (id) => {
    if (id == null) {
      throw new Error("Activity ID is missing.");
    }

    activity.id = id;
  };

  return createObjectTemplate(functionKey, code);
}

function setType(activity) {
  const functionKey = "setType";
  const code = (type) => {
    if (type == null) {
      throw new Error("Type is missing.");
    }

    activity.type = type;
  };

  return createObjectTemplate(functionKey, code);
}

function setDescription(activity) {
  const functionKey = "setDescription";
  const code = (description) => {
    assertTextInput(description, "Activity description");

    activity.description = description;
  };

  return createObjectTemplate(functionKey, code);
}

function add() {
  const functionKey = "add";
  const code = (list, element) => {
    if (!Array.isArray(list)) {
      throw new Error("The list to add an element to is not an Array.");
    }

    if (!list.includes(element)) {
      list.push(element);
    }
  };

  return createObjectTemplate(functionKey, code);
}

function remove() {
  const functionKey = "remove";
  const code = (list, element) => {
    if (!Array.isArray(list)) {
      throw new Error("The list to add an element to is not an Array.");
    }

    const position = list.indexOf(element);
    if (position > -1) {
      list.splice(position, 1);
    }
  };

  return createObjectTemplate(functionKey, code);
}

function activityCreator() {
  const activity = emptyData();

  return {
    activity: {
      ...activity,
      ...setID(activity.data),
      ...setType(activity.data),
      ...setDescription(activity.data),
      ...add(),
      ...remove(),
    },
  };
}

export { activityCreator };
