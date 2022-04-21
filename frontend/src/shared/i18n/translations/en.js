// Put short strings that should be translated in this list.
// Longer text and paragraphs should be put in the object below.
const strings = [
  "Achievements",
  "Activate account",
  "Activity",
  "Already activated your account?",
  "Answer",
  "Attributions",
  "bonus point",
  "bonus points",
  "Calculating points…",
  "Categories",
  "Challenge completed",
  "Challenge",
  "challenge",
  "Challenges",
  "challenges",
  "Change password",
  "Complete challenge",
  "Confirm new password",
  "Confirm password",
  "Contact info",
  "Continue",
  "Couldn't find any challenges",
  "Couldn't find any content",
  "Create account",
  "Email",
  "Emojis by",
  "External resources",
  "Get a hint?",
  "Get ready!",
  "Go back",
  "Graphics",
  "Haven't activated your account yet?",
  "Here's a little hint",
  "High score",
  "Illustrations by",
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
  "of",
  "Password",
  "Permission level",
  "Phone",
  "point",
  "points",
  "Prefer dark theme",
  "Profile",
  "Progress",
  "Project info",
  "Project website",
  "Purpose",
  "Reflection",
  "Reset",
  "Something went wrong!",
  "Start",
  "Try again",
  "Undo",
  "Up for another challenge?",
  "Username copied to clipboard",
  "Username",
  "Verify username",
  "Watch a video",
  "Well done!",
  "What do you think about the challenge?",
  "Your password is updated",

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

  howToFormAnArgumentTitle: "Put together an argument here",
  howToFormAnArgumentText:
    "Drag items from the box above and drop them here to form an argument. " +
    "Remember that order is crucial!",

  swapPermissionTitle: "This part of the experiment has now ended",
  swapPermissionParagraph1:
    "You have been assigned a new group for the next part of the experiment. " +
    "In order for the necessary changes to take effect, you will now be " +
    "logged out of the application.",
  swapPermissionParagraph2:
    "You will be asked to log in again to participate in the next part.",
  swapPermissionThanks: "Thank you so much for participating!",

  // Challenge difficulty levels
  beginner: "Beginner",
  intermediate: "Intermediate",
  expert: "Expert",
};

export default strings.reduce((obj, value) => {
  return {
    ...obj,
    [value]: value,
  };
}, en);
