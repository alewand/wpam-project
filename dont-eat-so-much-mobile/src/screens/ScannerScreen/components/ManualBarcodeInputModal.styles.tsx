import { StyleSheet } from "react-native";
import {
  SECONDARY_COLOR,
  TEXT_COLOR,
  SECOND_TEXT_COLOR,
  WHITE,
  BLACK,
  MAIN_COLOR,
} from "../../../constants/colors";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    padding: 20,
    backgroundColor: WHITE,
    elevation: 8,
    shadowColor: BLACK,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: TEXT_COLOR,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    color: TEXT_COLOR,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: TEXT_COLOR,
    backgroundColor: WHITE,
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: SECONDARY_COLOR,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_COLOR,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: SECONDARY_COLOR,
    opacity: 0.5,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: WHITE,
  },
  confirmButtonTextDisabled: {
    color: SECOND_TEXT_COLOR,
  },
});
