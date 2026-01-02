import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, SECONDARY_COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
  snackbar: {
    flexDirection: "row",
    backgroundColor: SECONDARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 60,
    borderRadius: 12,
  },
  message: {
    color: BACKGROUND_COLOR,
    fontSize: 16,
  },
});
