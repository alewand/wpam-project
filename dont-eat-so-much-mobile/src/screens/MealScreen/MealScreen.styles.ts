import { StyleSheet } from "react-native";

import { MAIN_COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "50%",
  },
  buttonIcon: {
    height: 20,
    resizeMode: "contain",
    width: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
