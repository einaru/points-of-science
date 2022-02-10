import { createObjectTemplate, saveData } from "../internal.js";
import config from "../Config/config.js";

function updateData(clickStreamItem) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Click Stream Item could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      clickStreamItem[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function deleteClickStreamItem(data) {
  const functionKey = "deleteClickStreamItem";
  const code = (clickStreamItem) => {
    return new Promise((resolve, reject) => {
      if (clickStreamItem == null) {
        resolve("Click stream was null, and therefore not deleted.");
      } else {
        clickStreamItem
          .deleteClickStreamItem(data.nextItem)
          .then(() => {
            return deleteData(config.db.table.clickStreamItem, data.id);
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };

  return createObjectTemplate(functionKey, code);
}

function node(value) {
  return {
    value,
    nextItem: null,
    prevItem: null,
  };
}

function printList(clickStreamItem) {
  const functionKey = "printList";
  const code = () => {
    const array = [];
    let currentList = clickStreamItem.head;
    while (currentList !== null) {
      array.push(currentList.value);
      currentList = currentList.nextItem;
    }

    array.forEach((data) => {
      console.log(data);
      console.log(" <--> ");
    });
    return clickStreamItem;
  };

  return createObjectTemplate(functionKey, code);
}

function append(data) {
  const functionKey = "append";
  const code = (value) => {
    let newNode = node(value);

    data.tail.nextItem = newNode;
    newNode.prevItem = data.tail;
    data.tail = newNode;

    data.size += 1;
    return data;
  };

  return createObjectTemplate(functionKey, code);
}

function prepend(data) {
  const functionKey = "prepend";
  const code = (value) => {
    let newNode = node(value);
    newNode.nextItem = data.head;
    data.head.prevItem = newNode;
    data.head = newNode;

    data.size += 1;
    return data;
  };

  return createObjectTemplate(functionKey, code);
}

function insert(data) {
  const functionKey = "insert";
  const code = (index, clickStreamItem, value) => {
    if (!Number.isInteger(index) || index < 0 || index > data.size + 1) {
      throw new Error(`Invalid index. Current size is ${data.size}`);
    }

    if (index === 0) {
      clickStreamItem.prepend(value);
      return clickStreamItem;
    }

    if (index === data.size) {
      clickStreamItem.append(value);
      return clickStreamItem;
    }

    let newNode = node(value);
    let previous = data.head;
    for (let n = 0; n < index - 1; n++) {
      previous = previous.nextItem;
    }

    let next = previous.nextItem;

    newNode.nextItem = next;
    previous.nextItem = newNode;
    newNode.prevItem = previous;
    next.prevItem = newNode;

    data.size += 1;
    return data;
  };

  return createObjectTemplate(functionKey, code);
}

function remove(data) {
  const functionKey = "remove";
  const code = (index) => {
    if (!Number.isInteger(index) || index < 0 || index > data.size + 1) {
      throw new Error(`Invalid index. Current size is ${data.size}`);
    }

    if (index === 0) {
      data.head = data.head.nextItem;
      data.head.prevItem = null;

      data.size -= 1;
      return data;
    }

    if (index === data.size - 1) {
      data.tail = data.tail.prevItem;
      data.tail.nextItem = null;

      data.size -= 1;
      return data;
    }

    let previous = data.head;
    for (let n = 0; n < index - 1; n++) {
      previous = previous.nextItem;
    }

    let deleted = previous.nextItem;
    let next = deleted.nextItem;

    previous.nextItem = next;
    next.prevItem = previous;

    data.size -= 1;
    return data;
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      head: {
        ...node({
          id: "",
          screenID: "",
          timestamp: "0000-00-00T00:00:00.000Z",
        }),
      },
      tail: {
        ...node({
          id: "",
          screenID: "",
          timestamp: "0000-00-00T00:00:00.000Z",
        }),
      },
      size: 1,
    },
  };
}

function clickStreamItemCreator() {
  const clickStreamItem = emptyData();

  return {
    ...clickStreamItem,
    ...updateData(clickStreamItem.data),
    ...deleteClickStreamItem(clickStreamItem.data),
    ...saveData(),
    ...append(clickStreamItem.data),
    ...prepend(clickStreamItem.data),
    ...insert(clickStreamItem.data),
    ...remove(clickStreamItem.data),
    ...printList(clickStreamItem.data),
  };
}

export { clickStreamItemCreator, node };
