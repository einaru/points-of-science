import { StyleSheet } from "react-native";

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
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 8,
  },
  image: {
    height: 200,
    width: "100%",
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
