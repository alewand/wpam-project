import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { styles } from "./LoginScreen.styles";
import { Formik } from "formik";
import { LoginRequest } from "../../store/auth/types";
import { FormField } from "../../components/FormField/FormField";
import { AppNavigation } from "../../navigation/Navigation";
import { Header } from "../../components/Header/Header";
import { useDisplayError } from "../../hooks/useDisplayError";
import { useLogin } from "../../store/auth/api/useLogin";
import { getFormButtonColor, isFormButtonDisabled } from "./helpers";
import { useCallback, useEffect } from "react";

const logo = require("../../assets/logo.png");
const emailIcon = require("../../assets/icons/email.png");
const passwordIcon = require("../../assets/icons/password.png");

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("email.required")
    .min(1, "email.tooShort")
    .max(50, "email.tooLong")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email.invalidFormat"),
  password: Yup.string()
    .required("password.required")
    .min(10, "password.tooShort")
    .max(50, "password.tooLong"),
});

export const LoginScreen = () => {
  const { login, isLoading, isSuccess, isError, error, errorRaw } = useLogin();
  const navigation = useNavigation<AppNavigation>();
  const { t } = useTranslation();

  useDisplayError({ isError, error, errorRaw });

  const navigateToWelcome = useCallback(() => {
    navigation.navigate("Welcome");
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate("Register");
  }, [navigation]);

  const navigateToMeal = useCallback(() => {
    navigation.navigate("BottomTabs", {
      screen: "Meal",
    });
  }, [navigation]);

  useEffect(() => {
    if (isSuccess) navigateToMeal();
  }, [isSuccess, navigateToMeal]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onGoBack={navigateToWelcome} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.contentContainer}>
            <Image source={logo} />
            <Text style={styles.title}>{t("common:login:title")}</Text>

            <Formik
              initialValues={{ email: "", password: "" } as LoginRequest}
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values) => login(values)}
            >
              {({ handleChange, handleBlur, submitForm, values, errors, touched }) => (
                <View style={styles.formContainer}>
                  <FormField
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    placeholder={t("common:common:emailAddress")}
                    iconSource={emailIcon}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <FormField
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder={t("common:common:password")}
                    iconSource={passwordIcon}
                    error={errors.password}
                    touched={touched.password}
                    isPassword
                  />
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        ...styles.loginButton,
                        backgroundColor: getFormButtonColor(isLoading, values, errors),
                      },
                    ]}
                    onPress={submitForm}
                    disabled={isFormButtonDisabled(isLoading, values, errors)}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.loginButtonText}>{t("common:login:button")}</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={navigateToRegister}
                  >
                    <Text style={styles.registerButtonText}>{t("common:register:button")}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
