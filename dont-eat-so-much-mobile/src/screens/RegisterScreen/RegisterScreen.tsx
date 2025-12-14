import React, { useCallback, useEffect } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { styles } from "./RegisterScreen.styles";
import { Formik } from "formik";
import { RegisterRequest } from "../../store/auth/types";
import { FormField } from "../../components/FormField/FormField";
import { useRegister } from "../../store/auth/api/useRegister";
import { AppNavigation } from "../../navigation/Navigation";
import { Header } from "../../components/Header/Header";
import { getFormButtonColor, isFormButtonDisabled } from "./helpers";
import { useDisplayError } from "../../hooks/useDisplayError";
import { ActivityIndicator } from "react-native-paper";


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "name.tooShort")
        .max(20, "name.tooLong")
        .required("name.required"),
    email: Yup.string()
        .min(1, "email.tooShort")
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email.invalidFormat"
        )
        .max(50, "email.tooLong")
        .required("email.required"),
    password: Yup.string()
        .min(10, "password.tooShort")
        .max(50, "password.tooLong")
        .required("password.required"),
    confirmPassword: Yup.string()
        .required("confirmPassword.required")
        .oneOf([Yup.ref("password")], "confirmPassword.mismatch"),
});

const logo = require("../../assets/logo.png");
const nameIcon = require('../../assets/icons/name.png');
const emailIcon = require('../../assets/icons/email.png');
const passwordIcon = require('../../assets/icons/password.png');

export interface RegisterFormValues extends RegisterRequest {
    confirmPassword: string;
}

export const RegisterScreen = () => {
    const { register, isLoading, isSuccess, isError, error } = useRegister();
    const navigation = useNavigation<AppNavigation>();
    const { t } = useTranslation();

    useDisplayError({ isError, error });

    const navigateToWelcome = useCallback(() => {
        navigation.navigate("Welcome");
    }, [navigation]);

    const navigateToLogin = useCallback(() => {
        navigation.navigate("Login");
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.contentContainer}>
                        <Image source={logo} />
                        <Text style={styles.title}>{t("common:register:title")}</Text>
                            <Formik
                                initialValues={{ name: '', email: '', password: '', confirmPassword: '' } as RegisterFormValues}
                                validationSchema={validationSchema}
                                validateOnChange={true}
                                validateOnBlur={true}
                                onSubmit={(values: RegisterFormValues) => register(values)}
                            >
                            {({ handleChange, handleBlur, submitForm, values, errors, touched }) => (
                                <View style={styles.formContainer}>
                                    <FormField
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        placeholder={t("common:common:name")}
                                        iconSource={nameIcon}
                                        error={errors.name}
                                        touched={touched.name}
                                    />
                                    <FormField
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        placeholder={t("common:common:emailAddress")}
                                        iconSource={emailIcon}
                                        error={errors.email}
                                        touched={touched.email}
                                    />
                                    <FormField
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        placeholder={t("common:common:password")}
                                        iconSource={passwordIcon}
                                        error={errors.password}
                                        touched={touched.password}
                                        isPassword
                                    />
                                    <FormField
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        placeholder={t("common:common:confirmPassword")}
                                        iconSource={passwordIcon}
                                        error={errors.confirmPassword}
                                        touched={touched.confirmPassword}
                                        isPassword
                                    />
                                    <TouchableOpacity
                                        style={[styles.button, { ...styles.registerButton, backgroundColor: getFormButtonColor(isLoading, values, errors) }]}
                                        onPress={submitForm}
                                        disabled={isFormButtonDisabled(isLoading, values, errors)}
                                    >
                                        {
                                            isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> :
                                        <Text style={styles.registerButtonText}>{t("common:register:button")}</Text>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={navigateToLogin}>
                                        <Text style={styles.loginButtonText}>{t("common:login:button")}</Text>
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