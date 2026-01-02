import { StyleSheet } from "react-native";
import {
  WHITE,
  TEXT_COLOR,
  SECOND_TEXT_COLOR,
  SECONDARY_COLOR,
  MAIN_COLOR,
} from "../../../constants/colors";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    padding: 14,
  },
  title: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingVertical: 2,
  },
  label: {
    flex: 1,
    color: SECOND_TEXT_COLOR,
    fontSize: 13,
    fontWeight: "700",
  },
  value: {
    color: MAIN_COLOR,
    fontSize: 13,
    fontWeight: "900",
  },
});
