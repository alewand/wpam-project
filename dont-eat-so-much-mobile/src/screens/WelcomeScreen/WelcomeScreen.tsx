import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./WelcomeScreen.styles";
import { useCallback } from "react";
import { AppNavigation } from "../../navigation/Navigation";

const logo = require("../../assets/logoBig.png");

export const WelcomeScreen = () => {
    const navigation = useNavigation<AppNavigation>();
    const { t } = useTranslation();

    const navigateToLogin = useCallback(() => {
        navigation.navigate("Login");
    }, [navigation]);
    
    const navigateToRegister = useCallback(() => {
        navigation.navigate("Register"); 
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t("common:welcome.title")}</Text>
                <Text style={styles.subTitle}>{t("common:welcome.subTitle")}</Text>
                <Text style={styles.description}>{t("common:welcome.description")}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={navigateToLogin} style={[styles.button, styles.loginButton]}>
                    <Text style={styles.loginButtonText}>{t("common:login:button")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToRegister} style={[styles.button, styles.registerButton]}>
                    <Text style={styles.registerButtonText}>{t("common:register:button")}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};