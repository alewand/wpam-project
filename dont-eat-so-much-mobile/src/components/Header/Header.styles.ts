import { StyleSheet } from "react-native";
import { MAIN_COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
  },
  goBackCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  goBackIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});