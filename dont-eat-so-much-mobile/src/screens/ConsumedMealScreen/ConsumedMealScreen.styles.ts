import { StyleSheet } from "react-native";
import {
  BACKGROUND_COLOR,
  MAIN_COLOR,
  SECOND_TEXT_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  WHITE,
} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
  },
  headerContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 16,
  },
  mealInfoCard: {
    width: "100%",
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    gap: 12,
  },
  mealImage: {
    width: 120,
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
  },
  mealImagePlaceholder: {
    width: 120,
    height: 150,
    borderRadius: 12,
    backgroundColor: SECONDARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  mealImagePlaceholderIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    opacity: 0.5,
  },
  mealName: {
    color: TEXT_COLOR,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  mealBrand: {
    marginTop: 4,
    height: 18,
    lineHeight: 18,
    color: SECOND_TEXT_COLOR,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  confirmButton: {
    width: "100%",
    height: 52,
    borderRadius: 16,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: SECONDARY_COLOR,
  },
  confirmButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "900",
  },
});
