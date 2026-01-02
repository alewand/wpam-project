import { StyleSheet } from "react-native";
import { MAIN_COLOR, SECONDARY_COLOR, TEXT_COLOR, WHITE } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  gramsLabel: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: "500",
  },
  applyButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonDisabled: {
    backgroundColor: SECONDARY_COLOR,
  },
  applyButtonText: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    borderRadius: 12,
    width: 200,
    backgroundColor: WHITE,
  },
  resetButton: {
    marginTop: 6,
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  resetButtonDisabled: {
    borderColor: SECONDARY_COLOR,
    opacity: 0.6,
  },
  resetText: {
    color: MAIN_COLOR,
    fontSize: 14,
    fontWeight: "700",
  },
  resetTextDisabled: {
    color: SECONDARY_COLOR,
  },
});
