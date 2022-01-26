import { contentCreator, progressCreator } from "../../internal.js";

function categoryCreator() {
  const content = contentCreator();
  const category = emptyData();
  const progress = progressCreator();

  return {
    ...content,
    ...progress,
    ...category,
    ...addChallenge(category.data),
    ...removeChallenge(category.data),
    ...deleteCategory(category.data),
  };
}

function addChallenge(category) {
  const key = "addChallenge";
  const code = (challenge) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function removeChallenge(category) {
  const key = "removeChallenge";
  const code = (challenge) => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function deleteCategory(category) {
  const key = "deleteCategory";
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
      challenges: [],
    },
  };
}

export { categoryCreator };
