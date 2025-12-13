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
    gap: 5,
  },
  logoContainer: {
    width: "100%",
    maxWidth: 232,
    maxHeight: 348,
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
    gap: 20,
  },
  button: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  registerButton: {
    width: "80%",
    minWidth: 300,
    backgroundColor: MAIN_COLOR,
  },
  loginButton: {
    width: "60%",
    minWidth: 250,
    backgroundColor: BACKGROUND_COLOR,
    borderColor: MAIN_COLOR,
    borderWidth: 2,
  },
  registerButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  loginButtonText: {
    color: MAIN_COLOR,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
