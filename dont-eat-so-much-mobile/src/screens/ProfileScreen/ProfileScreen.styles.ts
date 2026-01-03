import { StyleSheet } from "react-native";
import {
  MAIN_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  SECOND_TEXT_COLOR,
  WHITE,
  BACKGROUND_COLOR,
  ERROR,
} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  userDataContainer: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  userDataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userDataLabel: {
    fontSize: 14,
    color: SECOND_TEXT_COLOR,
  },
  userDataValue: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_COLOR,
  },
  formContainer: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  limitsContainer: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  button: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonDanger: {
    backgroundColor: ERROR,
    marginBottom: 24,
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "700",
  },
  deleteAccountContainer: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginTop: 24,
  },
  deleteAccountWarning: {
    fontSize: 14,
    color: SECOND_TEXT_COLOR,
    marginBottom: 8,
  },
  keyboardView: {
    flex: 1,
  },
  editIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: MAIN_COLOR,
  },
  limitFieldContainer: {
    gap: 12,
  },
  limitFieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_COLOR,
  },
  limitFieldInput: {
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: TEXT_COLOR,
  },
  saveLimitsButton: {
    marginTop: 16,
  },
  languageContainer: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 8,
    flexDirection: "row",
    gap: 8,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  languageButtonActive: {
    backgroundColor: MAIN_COLOR,
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_COLOR,
  },
  languageButtonTextActive: {
    color: WHITE,
  },
});
