function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function emptyData() {
  return {
    data: {
      id: 0,
      percentage: 0,
    },
  };
}

function updateProgress(progress) {
  const functionKey = "updateData";
  const code = (args) => {
    // Fill in the blanks
    if (args == null) {
      return;
    }

    Object.keys(args).forEach((key) => {
      progress[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function setProgress(progress) {
  const functionKey = "setProgress";
  const code = (percentage) => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function calculateProgress(progress) {
  const functionKey = "calculateProgress";
  const code = (completeList, totalList) => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function deleteProgress(progress) {
  const functionKey = "deleteProgress";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function progressCreator() {
  const progress = emptyData();

  return {
    progress: {
      ...progress,
      ...updateProgress(progress.data),
      ...setProgress(progress.data),
      ...calculateProgress(progress.data),
      ...deleteProgress(progress.data),
    },
  };
}

export { progressCreator };
