function checkPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function validatePassword(password) {
  return true;
}

export { checkPassword, validatePassword };
