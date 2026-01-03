import { StyleSheet } from "react-native";
import {
  MAIN_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  SECOND_TEXT_COLOR,
  WHITE,
} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formContainer: {
    gap: 16,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_COLOR,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_COLOR,
  },
  requiredFieldsInfo: {
    fontSize: 12,
    color: SECOND_TEXT_COLOR,
    marginTop: 8,
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: SECONDARY_COLOR,
  },
  submitButtonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: "700",
  },
});
