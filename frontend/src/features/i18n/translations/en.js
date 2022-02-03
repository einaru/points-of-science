// Put short strings that should be translated in this list.
// Longer text and paragraphs should be put in the object below.
const strings = [
  "Username",
  "Password",
  "Confirm password",
  "Change password",
  "New password",
  "Confirm new password",
  "Your password is updated",
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
  "Go back",
  "Dashboard",
  "Achievements",
  "Project info",
  "Purpose",
  "Contact info",
];

const en = {
  aboutPurpose:
    "This research project is carried out as part of a master's thesis at " +
    "IDI at NTNU in Trondheim. The purpose of the project is to investigate " +
    "how the use of game elements in a mobile application can influence " +
    "young people's interest in and attitude towards science.",
  aboutContact:
    "Don't hesitate to get in touch if you have any questions about the app " +
    "or the research project.",
};

export default strings.reduce((obj, value, index, array) => {
  return {
    ...obj,
    [array[index]]: value,
  };
}, en);
