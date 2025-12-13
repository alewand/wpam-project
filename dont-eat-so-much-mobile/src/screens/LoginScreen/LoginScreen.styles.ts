import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, MAIN_COLOR, TEXT_COLOR, } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    gap: 10,
  },
  logoContainer: {
    width: "100%",
    maxWidth: 250,
    maxHeight: 350,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
    color: TEXT_COLOR,
  },
  formContainer: {
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      gap: 25,
  },
  button: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButton: {
    minWidth: 300,
    backgroundColor: MAIN_COLOR,
  },
  registerButton: {
    minWidth: 250,
    backgroundColor: BACKGROUND_COLOR,
    borderColor: MAIN_COLOR,
    borderWidth: 2,
  },
  loginButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  registerButtonText: {
    color: MAIN_COLOR,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
