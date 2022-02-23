import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    margin: 8,
  },
  helpContainer: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  shoutOutContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shoutOut: {
    fontSize: 48,
    fontWeight: "bold",
  },
  illustrationImage: {
    width: "100%",
    height: 200,
  },
  chip: {
    marginEnd: 8,
  },
  title: {
    marginVertical: 8,
  },
  text: {
    marginBottom: 8,
  },
  textarea: {
    flex: 1,
  },
  action: {
    margin: 8,
  },
  rewardContainer: {
    margin: 24,
    alignItems: "center",
  },
  rewardTitle: {
    fontSize: 64,
    fontWeight: "bold",
  },
  rewardSubtitle: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
});
