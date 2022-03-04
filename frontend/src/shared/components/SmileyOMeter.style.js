import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 4,
    marginVertical: 8,
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
    height: 64,
    width: 64,
  },
  smileyLabel: {
    fontSize: 12,
    height: 36,
    textAlign: "center",
  },
});
