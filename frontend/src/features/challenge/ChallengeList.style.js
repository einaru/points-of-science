import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 8,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },
  title: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  image: {
    width: "100%",
    height: 100,
  },
  chip: {
    marginEnd: 4,
  },
  surface: {
    marginBottom: 8,
    elevation: 2,
  },
});
