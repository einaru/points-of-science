import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 8,
  },
  noContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noContentText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listItemContainer: {
    flexDirection: "row",
    height: 100,
    padding: 8,
  },
  listItemContent: {
    flexDirection: "column",
    marginStart: 16,
  },
  image: {
    width: 84,
    height: 84,
  },
  surface: {
    marginBottom: 8,
    elevation: 2,
  },
});

export default styles;
