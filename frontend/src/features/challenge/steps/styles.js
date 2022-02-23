import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    margin: 8,
  },
  helpContainer: {
    marginHorizontal: 8,
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
    fontSize: 32,
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
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "baseline",
  },
  rewardTitle: {
    fontSize: 64,
    fontWeight: "bold",
  },
  rewardSubtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginStart: 8,
    lineHeight: 64,
  },
  surface: {
    margin: 8,
    marginTop: 16,
    elevation: 1,
    borderRadius: 4,
  },
});
