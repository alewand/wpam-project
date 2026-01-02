import { StyleSheet } from "react-native";
import { WHITE, TEXT_COLOR, BACKGROUND_COLOR } from "../../../constants/colors";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: WHITE,
    borderRadius: 20,
    maxHeight: "80%",
    minHeight: 400,
    width: "90%",
    zIndex: 1001,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_COLOR,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: TEXT_COLOR,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  additionalSection: {
    marginTop: 8,
  },
  circlesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  circleContainer: {
    alignItems: "center",
    gap: 8,
    width: "45%",
    marginBottom: 12,
  },
  circleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: TEXT_COLOR,
  },
  circleValue: {
    fontSize: 9,
    fontWeight: "600",
    color: TEXT_COLOR,
    textAlign: "center",
  },
});
