import { StyleSheet } from "react-native";

const imageHeight = 200;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    margin: 8,
  },
  help: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  meta: {
    flex: 1,
    justifyContent: "space-between",
    padding: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pagerView: {
    flex: 1,
    height: imageHeight,
  },
  image: {
    flex: 1,
    height: imageHeight,
    width: "100%",
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
