import { StyleSheet } from "react-native";
import {
  MAIN_COLOR,
  TEXT_COLOR,
  SECOND_TEXT_COLOR,
  BACKGROUND_COLOR,
  GRAY_LIGHT,
  WHITE,
} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_LIGHT,
  },
  searchInput: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: TEXT_COLOR,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: MAIN_COLOR,
  },
  checkboxCheckmark: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    color: TEXT_COLOR,
  },
  addCustomButton: {
    backgroundColor: MAIN_COLOR,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  addCustomButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
  mealItem: {
    backgroundColor: WHITE,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_LIGHT,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  mealBrand: {
    fontSize: 14,
    color: SECOND_TEXT_COLOR,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyPlaceholderIcon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    opacity: 0.5,
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    color: SECOND_TEXT_COLOR,
    textAlign: "center",
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
