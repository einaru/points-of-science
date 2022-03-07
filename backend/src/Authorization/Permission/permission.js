import { UserInputError } from "../../API/GraphQL/error.js";

const permissionLevels = {
  1: { text: "admin", value: 1 },
  2: { text: "experiment", value: 2 },
  3: { text: "control", value: 3 },
};

Object.freeze(permissionLevels);

function getPermissionLevels() {
  return permissionLevels;
}

function setPermissionLevel(permissionLevel, user) {
  if (permissionLevels[permissionLevel] == null) {
    throw new UserInputError("Invalid permission level.");
  }

  user.updateData({ permission: permissionLevel });
  return `Permission for user ${user.data.username} was updated.`;
}

function swapPermissionGroup(users) {
  users.forEach((user) => {
    if (isPermissionGroup(user, 2)) {
      user.updateData({ permission: user.data.permission + 1 });
    } else if (isPermissionGroup(user, 3)) {
      user.updateData({ permission: user.data.permission - 1 });
    }
  });
}

function isPermissionGroup(user, permissionLevel) {
  return user.data.permission === permissionLevels[permissionLevel].value;
}

export {
  getPermissionLevels,
  setPermissionLevel,
  swapPermissionGroup,
  isPermissionGroup,
};
