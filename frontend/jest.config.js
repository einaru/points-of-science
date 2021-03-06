module.exports = {
  preset: "jest-expo",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|@sentry/.*|sentry-expo|native-base|react-native-svg)",
  ],
  setupFiles: ["./jest/setup.js"],
};
