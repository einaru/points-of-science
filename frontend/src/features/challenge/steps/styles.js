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
});
