// Put short strings that should be translated in this list.
// Longer text and paragraphs should be put in the object below.
const strings = [
  "Achievements",
  "Activate account",
  "Activity",
  "Already activated your account?",
  "Categories",
  "Challenge completed",
  "Challenge",
  "Challenges",
  "Change password",
  "Complete challenge",
  "Confirm new password",
  "Confirm password",
  "Contact info",
  "Continue",
  "Couldn't find any challenges",
  "Couldn't find any content",
  "Create account",
  "Dashboard",
  "External resources",
  "Form your argument here",
  "Get a hint?",
  "Get ready!",
  "Go back",
  "Haven't activated your account yet?",
  "Here's a little hint",
  "Intro",
  "Leaderboards",
  "Loading content…",
  "Log in",
  "Log out",
  "Logging out…",
  "Login",
  "Logout",
  "New password",
  "Next",
  "No more items to choose from!",
  "Password",
  "Prefer dark theme",
  "Profile",
  "Project info",
  "Purpose",
  "Reflection",
  "Reset",
  "Start",
  "Undo",
  "Up for another challenge?",
  "Username copied to clipboard",
  "Username",
  "Verify username",
  "Watch a video",
  "Well done!",
  "What do you think about the challenge?",
  "Your password is updated",
  "points",

  // Smiley-o-meter
  "Awful",
  "Not very good",
  "Good",
  "Really good",
  "Brilliant",
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

  howToFormAnArgumentText1:
    "Use the items from the box above by dragging them and dropping them " +
    "into this box. If you change your mind you can drop them back into the " +
    "box above.",
  howToFormAnArgumentText2:
    "Remember that the order in which you add items matters.",
};

export default strings.reduce((obj, value, index, array) => {
  return {
    ...obj,
    [array[index]]: value,
  };
}, en);
