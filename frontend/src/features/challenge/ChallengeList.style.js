import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 8,
  },
  listItem: {
    marginBottom: 8,
  },
  listItemCover: {
    height: 100,
  },
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  chip: {
    marginEnd: 4,
  },
});

export default styles;
