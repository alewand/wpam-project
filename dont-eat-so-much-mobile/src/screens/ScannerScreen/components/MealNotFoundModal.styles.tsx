import { StyleSheet } from "react-native";
import {
  SECONDARY_COLOR,
  TEXT_COLOR,
  SECOND_TEXT_COLOR,
  WHITE,
  BLACK,
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
    alignItems: "center",
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
  barcodeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: SECONDARY_COLOR,
    marginBottom: 18,
  },
  barcodeLabel: {
    fontSize: 13,
    color: SECOND_TEXT_COLOR,
    marginRight: 8,
  },
  barcodeValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: TEXT_COLOR,
  },
});
