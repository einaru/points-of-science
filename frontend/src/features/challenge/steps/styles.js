import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 8,
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
});

export default styles;