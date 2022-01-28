const strings = [
  "Username",
  "Password",
  "Confirm password",
  "Login",
  "Log in",
  "Logout",
  "Log out",
  "Activate account",
  "Create account",
  "Haven't activated your account yet?",
  "Already activated your account?",
  "Verify username",
  "Next",
];

export default strings.reduce((obj, value, index, array) => {
  return {
    ...obj,
    [array[index]]: value,
  };
}, {});
