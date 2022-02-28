import { createObjectTemplate } from "../../internal.js";

function emptyData() {
  return {
    data: {
      percentage: 0,
    },
  };
}

function setProgress(progress) {
  const functionKey = "setProgress";
  const code = (percentage) => {
    if (!Number(percentage) === percentage && percentage % 1 !== 0) {
      throw new Error("Progress must be a float.");
    }

    progress.percentage = percentage;
  };

  return createObjectTemplate(functionKey, code);
}

function calculateProgress() {
  const functionKey = "calculateProgress";
  const code = (completeList, totalList) => {
    if (!Array.isArray(completeList)) {
      throw new Error(
        "The list with completed challenges must be of type Array."
      );
    }

    if (!Array.isArray(totalList)) {
      throw new Error("The list with all challenges must be of type Array.");
    }

    const uniqueChallenges = completeList.filter((value, index, self) => {
      return (
        self.map((object) => object.challengeID).indexOf(value.challengeID) ===
          index && totalList.includes(value.challengeID)
      );
    });

    if (!totalList.length || !uniqueChallenges.length) {
      return 0;
    }

    return uniqueChallenges.length / totalList.length;
  };

  return createObjectTemplate(functionKey, code);
}

function progressCreator() {
  const progress = emptyData();

  return {
    progress: {
      ...progress,
      ...setProgress(progress.data),
      ...calculateProgress(),
    },
  };
}

export { progressCreator };
