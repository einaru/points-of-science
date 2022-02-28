import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    margin: 16,
    alignItems: "center",
  },
  smileyometer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  smileyContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
  },
  smileyImage: {
    width: 64,
    height: 64,
  },
  smileyLabel: {
    fontSize: 12,
    height: 36,
    textAlign: "center",
  },
});
