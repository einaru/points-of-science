function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function getResponseObject(message, statusCode, type, data) {
  return {
    message,
    status: statusCode,
    type,
    data,
  };
}

export {
  createObjectTemplate,
  getResponseObject,
};
