import { StyleSheet } from "react-native";
import {
  BACKGROUND_COLOR,
  BLACK,
  SECOND_TEXT_COLOR,
  TEXT_COLOR,
  WHITE,
  GRAY_LIGHT,
} from "../../constants/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: GRAY_LIGHT,
    shadowColor: BLACK,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  left: {
    width: 50,
    height: 50,
    borderRadius: 8,
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
    width: 30,
    height: 30,
    resizeMode: "contain",
    opacity: 0.5,
  },
  right: {
    flex: 1,
  },
  name: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 4,
  },
  brand: {
    color: SECOND_TEXT_COLOR,
    fontSize: 14,
    fontWeight: "400",
  },
});
