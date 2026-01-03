import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, WHITE } from "../constants/colors";

export const styles = StyleSheet.create({
  tabBarIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  tabBarLabelContainer: {
    marginTop: 4,
  },
  tabBarLabelText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabBarLabelTextActive: {
    color: WHITE,
  },
  tabBarLabelTextInactive: {
    color: BACKGROUND_COLOR,
  },
  tabBarLabelUnderline: {
    height: 2,
    backgroundColor: WHITE,
    borderRadius: 1,
    marginTop: 2,
    width: "60%",
    alignSelf: "center",
  },
});
