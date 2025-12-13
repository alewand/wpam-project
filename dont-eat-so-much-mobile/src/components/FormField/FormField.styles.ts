import { StyleSheet } from "react-native";

import { ERROR, MAIN_COLOR, SECOND_TEXT_COLOR, TEXT_COLOR } from "../../constants/colors";

export const getStyles = (error: boolean) => StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: error ? ERROR : MAIN_COLOR,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    height: 50,
    justifyContent: "flex-start",
    paddingHorizontal: 8,
    width: "100%",
  },
  icon: {
    color: TEXT_COLOR,
    height: 30,
    resizeMode: "contain",
    width: 30,
  },
  input: {
    color: SECOND_TEXT_COLOR,
    flex: 1,
    fontSize: 20,
  },
});