import { CameraView } from "expo-camera";
import { useBarcodeScanner } from "./hooks/useBarcodeScanner";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { styles } from "./ScannerScreen.styles";
import { MAIN_COLOR } from "../../constants/colors";
import { Header } from "../../components/Header/Header";
import { MealNotFoundModal } from "./components/MealNotFoundModal";
import { ManualBarcodeInputModal } from "./components/ManualBarcodeInputModal";

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
    isMealNotFoundModalVisible,
    handleCloseMealNotFoundModal,
    isLoading,
    barcode,
    isManualBarcodeInputModalVisible,
    setIsManualBarcodeInputModalVisible,
    handleManualBarcodeInput,
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
          <Text style={styles.permissionText}>{t("scanner.permissionsNeeded")}</Text>

          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>{t("scanner.givePermission")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={isTorchInUse}
          onBarcodeScanned={isLoading ? () => {} : onBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8"],
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

          {!isLoading && !isMealNotFoundModalVisible && <View style={styles.frame} />}

          <View style={styles.bottomSection}>
            <View style={styles.textBackground}>
              <Text style={styles.hint}>{t("scanner.hintText")}</Text>
            </View>

            <TouchableOpacity
              style={styles.manualInputButton}
              onPress={() => setIsManualBarcodeInputModalVisible(true)}
            >
              <Text style={styles.manualInputButtonText}>{t("scanner.manualInputButton")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading && (
          <View style={styles.loadingOverlay} pointerEvents="auto">
            <ActivityIndicator size="large" color={MAIN_COLOR} />
            <Text style={styles.loadingText}>{t("scanner.loading")}</Text>
          </View>
        )}
      </SafeAreaView>

      {isMealNotFoundModalVisible && (
        <MealNotFoundModal
          barcode={barcode}
          isMealNotFoundModalVisible={isMealNotFoundModalVisible}
          onClose={handleCloseMealNotFoundModal}
        />
      )}

      <ManualBarcodeInputModal
        isVisible={isManualBarcodeInputModalVisible}
        onClose={() => setIsManualBarcodeInputModalVisible(false)}
        onConfirm={handleManualBarcodeInput}
      />
    </>
  );
};
