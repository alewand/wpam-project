import { StyleSheet } from "react-native";

import { MAIN_COLOR, SECOND_TEXT_COLOR, TEXT_COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    alignItems: "center",
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "50%",
  },
  buttonIcon: {
    height: 20,
    resizeMode: "contain",
    width: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minHeight: 500,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 32,
  },
  emptyPlaceholderIcon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    opacity: 0.5,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_COLOR,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: SECOND_TEXT_COLOR,
    textAlign: "center",
    lineHeight: 20,
  },
});
