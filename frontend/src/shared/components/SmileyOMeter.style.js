import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    margin: 16,
    alignItems: "center",
  },
  smileyometer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smileyContainer: {
    alignItems: "center",
    maxWidth: "20%",
  },
  smileyImage: {
    width: 64,
    height: 64,
  },
  smileyLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
