import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, MAIN_COLOR, SECOND_TEXT_COLOR, TEXT_COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16, 
  },
  logo: {
    resizeMode: "contain",
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  title: {
    fontSize: 64,
    fontWeight: "800",
    textAlign: "center",
    color: TEXT_COLOR,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: TEXT_COLOR,
    letterSpacing: 0.5,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: SECOND_TEXT_COLOR,
  },
  buttonsContainer: {
    width: "100%",
    padding: 16,
    gap: 18,
    alignItems: 'center',
  },
  button: {
    minWidth: 280,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: MAIN_COLOR,
  },
  registerButton: {
    backgroundColor: BACKGROUND_COLOR,
    borderColor: MAIN_COLOR,
    borderWidth: 2,
  },
  loginButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  registerButtonText: {
    color: MAIN_COLOR,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});