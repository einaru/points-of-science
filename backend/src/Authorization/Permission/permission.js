import config from "../../Config/config.js";

const permissionLevels = {
  1: { text: "admin", value: 1 },
  2: { text: "experimental", value: 2 },
  3: { text: "control", value: 3 },
};

Object.freeze(permissionLevels);

function getPermissionLevels() {
  return permissionLevels;
}

function checkPermissionLevel(permissionLevel, user) {
  try {
    if (user.permission !== permissionLevel) {
      return getResponseObject(
        `Access denied. Missing permission level of ${permissionLevels[permissionLevel].text}.`,
        401,
        config.responseType.error
      );
    }

    return getResponseObject(
      `Access granted.`,
      200,
      config.responseType.success
    );
  } catch (error) {
    return getResponseObject(
      `Access denied. Data is missing to complete the request. Error: ${error.message}.`,
      401,
      config.responseType.error
    );
  }
}

function setPermissionLevel(permissionLevel, user) {
  try {
    if (permissionLevels[permissionLevel] == null) {
      return getResponseObject(
        `Permission level was not found. Available permission levels are 1: admin, 2: experimental, and 3: control.`,
        400,
        config.responseType.error
      );
    }

    user.updateData({ permission: permissionLevel });
    return getResponseObject(
      `Permission for user ${user.data.username} was updated.`,
      200,
      config.responseType.success
    );
  } catch (error) {
    return getResponseObject(
      `Could not update permission level for user ${user.data.username}. Error: ${error.message}.`,
      400,
      config.responseType.error
    );
  }
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
  return user.data.permission == permissionLevels[permissionLevel].value;
}

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

export {
  checkPermissionLevel,
  getPermissionLevels,
  setPermissionLevel,
  swapPermissionGroup,
};
