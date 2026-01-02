import { StyleSheet } from "react-native";
import { MAIN_COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  row: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  goBackCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    elevation: 2,
  },

  goBackIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },

  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    zIndex: 1,
  },
});
