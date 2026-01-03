import { StyleSheet } from "react-native";
import {
  SECONDARY_COLOR,
  TEXT_COLOR,
  SECOND_TEXT_COLOR,
  WHITE,
  BLACK,
  ERROR,
  BACKDROP_COLOR,
} from "../../../constants/colors";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKDROP_COLOR,
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    padding: 24,
    backgroundColor: WHITE,
    elevation: 8,
    shadowColor: BLACK,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: TEXT_COLOR,
    textAlign: "center",
  },
  warning: {
    fontSize: 14,
    color: SECOND_TEXT_COLOR,
    marginBottom: 16,
    textAlign: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: SECONDARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: WHITE,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: ERROR,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: WHITE,
  },
});
