import { StyleSheet } from "react-native";
import {
  PROTEIN_STRONG,
  CARBS_STRONG,
  FAT_STRONG,
  MAIN_COLOR,
  ERROR,
  TEXT_COLOR,
  WHITE,
  GRAY_LIGHT,
} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: GRAY_LIGHT,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  caloriesContainer: {
    alignItems: "center",
    gap: 6,
  },
  caloriesContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: TEXT_COLOR,
  },
  caloriesValue: {
    fontSize: 10,
    fontWeight: "600",
    color: TEXT_COLOR,
    textAlign: "center",
  },
  macroItem: {
    alignItems: "center",
    gap: 6,
  },
  macroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  macroLetter: {
    fontSize: 14,
    fontWeight: "700",
  },
  macroValue: {
    fontSize: 10,
    fontWeight: "600",
    color: TEXT_COLOR,
    textAlign: "center",
  },
});

export const getMacroLetterStyle = (
  isExceeded: boolean,
  macroType: "protein" | "carbs" | "fat"
) => {
  const color = isExceeded
    ? ERROR
    : macroType === "protein"
      ? PROTEIN_STRONG
      : macroType === "carbs"
        ? CARBS_STRONG
        : FAT_STRONG;
  return { ...styles.macroLetter, color };
};

export const getTintColor = (
  isExceeded: boolean,
  macroType: "calories" | "protein" | "carbs" | "fat"
) => {
  if (isExceeded) return ERROR;
  if (macroType === "calories") return MAIN_COLOR;
  if (macroType === "protein") return PROTEIN_STRONG;
  if (macroType === "carbs") return CARBS_STRONG;
  return FAT_STRONG;
};
