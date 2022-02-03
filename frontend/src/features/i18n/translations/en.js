const strings = [
  "Username",
  "Password",
  "Confirm password",
  "Change password",
  "Login",
  "Log in",
  "Logout",
  "Log out",
  "Logging out…",
  "Activate account",
  "Create account",
  "Haven't activated your account yet?",
  "Already activated your account?",
  "Verify username",
  "Next",
  "Dashboard",
  "Achievements",
];

export default strings.reduce((obj, value, index, array) => {
  return {
    ...obj,
    [array[index]]: value,
  };
}, {});
