function clickStreamItemCreator() {
  const clickStreamItem = emptyData();

  return {
    ...clickStreamItem,
    ...updateData(clickStreamItem.data),
    ...addClickStreamItem(clickStreamItem.data),
    ...removeClickStreamItem(clickStreamItem.data),
    ...deleteClickStreamItem(clickStreamItem.data),
  };
}

function updateData(clickStreamItem) {
  const key = "updateData";
  const code = (args) => {
    // Fill in the blanks
    for (const [key, value] of Object.entries(args)) {
      clickStreamItem[key] = value;
    }
  };

  return createObjectTemplate(key, code);
}

function addClickStreamItem() {
  const key = "addClickStreamItem";
  const code = (key, clickStreamItem) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function removeClickStreamItem() {
  const key = "removeClickStreamItem";
  const code = (key, clickStreamItem) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function deleteClickStreamItem(clickStreamItem) {
  const key = "deleteClickStreamItem";
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
      screen_id: 0,
      timestamp: "0000-00-00T00:00:00.000Z",
      next_item: {},
      prev_item: {},
    },
  };
}

export { clickStreamItemCreator };
