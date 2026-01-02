import { StyleSheet } from "react-native";
import {
  BACKGROUND_COLOR,
  BLACK,
  CARBS,
  FAT,
  PROTEIN,
  SECOND_TEXT_COLOR,
  TEXT_COLOR,
  WHITE,
} from "../../constants/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  left: {
    width: 60,
    height: 75,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  right: {
    flex: 1,
    paddingRight: 26,
  },
  title: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  brand: {
    marginTop: 2,
    color: SECOND_TEXT_COLOR,
    fontSize: 13,
    fontWeight: "500",
  },
  grams: {
    marginTop: 4,
    color: TEXT_COLOR,
    fontSize: 14,
    fontWeight: "600",
  },
  pillsRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 6,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 0,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pillKcal: {
    backgroundColor: "#E5E7EB",
  },
  pillProtein: {
    backgroundColor: PROTEIN,
  },
  pillCarbs: {
    backgroundColor: CARBS,
  },
  pillFat: {
    backgroundColor: FAT,
  },
  pillTextKcal: {
    color: TEXT_COLOR,
    fontSize: 12,
    fontWeight: "700",
  },
  pillTextProtein: {
    color: TEXT_COLOR,
    fontSize: 12,
    fontWeight: "700",
  },
  pillTextCarbs: {
    color: TEXT_COLOR,
    fontSize: 12,
    fontWeight: "700",
  },
  pillTextFat: {
    color: TEXT_COLOR,
    fontSize: 12,
    fontWeight: "700",
  },
});
