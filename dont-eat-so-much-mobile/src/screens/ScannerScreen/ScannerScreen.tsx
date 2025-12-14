import { CameraView } from "expo-camera"
import { useBarcodeScanner } from "./hooks/useBarcodeScanner";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { styles } from "./ScannerScreen.styles";
import { MAIN_COLOR } from "../../constants/colors";
import { Header } from "../../components/Header/Header";

const torchOnIcon = require("../../assets/icons/torchOn.png");
const torchOffIcon = require("../../assets/icons/torchOff.png");
const goBackIcon = require("../../assets/icons/goBack.png");

export const ScannerScreen = () => {
    const { t } = useTranslation("common");

    const {
        onBarcodeScanned,
        permission,
        requestPermission,
        isTorchInUse,
        setIsTorchInUse,
        handleGoBack,
    } = useBarcodeScanner();

    if (!permission) {
        return (
            <SafeAreaView style={styles.permissionContainer}>
                <Header onGoBack={handleGoBack} />
                <View style={styles.permissionContent}>
                    <ActivityIndicator size="small" color={MAIN_COLOR} />
                </View>
            </SafeAreaView>
        );
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.permissionContainer}>
                <Header onGoBack={handleGoBack} />
                <View style={styles.permissionContent}>
                    <Text style={styles.permissionText}>
                    {t("scanner.permissionsNeeded")}
                    </Text>

                    <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                    >
                    <Text style={styles.permissionButtonText}>
                        {t("scanner.givePermission")}
                    </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

   return (
    <SafeAreaView style={styles.container}>
        <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            enableTorch={isTorchInUse}
            onBarcodeScanned={onBarcodeScanned}
            barcodeScannerSettings={{
                barcodeTypes: [
                    "ean13",
                    "ean8",
                ],
            }}
        />
        <View style={styles.overlay}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.textBackground} onPress={handleGoBack}>
                    <Image source={goBackIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.textBackground}
                    onPress={() => setIsTorchInUse((prev) => !prev)}
                >
                    <Image source={isTorchInUse ? torchOnIcon : torchOffIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.frame} />
            <View style={styles.textBackground}>
                <Text style={styles.hint}>{t("scanner.hintText")}</Text>
            </View>
        </View>
    </SafeAreaView>
  );
};

