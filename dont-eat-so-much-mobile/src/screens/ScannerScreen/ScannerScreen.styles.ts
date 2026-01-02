import { StyleSheet } from "react-native";
import { BLACK, TEXT_COLOR, WHITE } from "../../constants/colors";

export const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  permissionContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: "#f59e0b",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 16,
    paddingVertical: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  frame: {
    alignSelf: "center",
    width: "80%",
    height: 220,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  hint: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  textBackground: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSection: {
    gap: 12,
  },
  manualInputButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(245, 158, 11, 0.9)",
    alignItems: "center",
  },
  manualInputButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  torchIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  smallButtonText: {
    color: WHITE,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_COLOR,
    textAlign: "center",
  },
});
