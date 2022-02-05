// Put short strings that should be translated in this list.
// Longer text and paragraphs should be put in the object below.
const strings = [
  "Achievements",
  "Activate account",
  "Already activated your account?",
  "Challenges",
  "Change password",
  "Confirm new password",
  "Confirm password",
  "Contact info",
  "Create account",
  "Dashboard",
  "Go back",
  "Haven't activated your account yet?",
  "Leaderboards",
  "Log in",
  "Log out",
  "Logging out…",
  "Login",
  "Logout",
  "New password",
  "Next",
  "Password",
  "Prefer dark theme",
  "Profile",
  "Project info",
  "Purpose",
  "Reset",
  "Username copied to clipboard",
  "Username",
  "Verify username",
  "Your password is updated",
];

const en = {
  aboutContact:
    "Don't hesitate to get in touch if you have any questions about the app " +
    "or the research project.",
  aboutPurpose:
    "This research project is carried out as part of a master's thesis at " +
    "IDI at NTNU in Trondheim. The purpose of the project is to investigate " +
    "how the use of game elements in a mobile application can influence " +
    "young people's interest in and attitude towards science.",
};

export default strings.reduce((obj, value, index, array) => {
  return {
    ...obj,
    [array[index]]: value,
  };
}, en);
