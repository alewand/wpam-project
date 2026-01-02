import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./ManualBarcodeInputModal.styles";
import { EAN13_LENGTH, isValidBarcodeLength } from "../../../constants/constants";

interface ManualBarcodeInputModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (barcode: string) => void;
}

export const ManualBarcodeInputModal = ({
  isVisible,
  onClose,
  onConfirm,
}: ManualBarcodeInputModalProps) => {
  const { t } = useTranslation("common", { keyPrefix: "scanner.manualInput" });
  const [barcode, setBarcode] = useState("");

  const handleConfirm = () => {
    const trimmedBarcode = barcode.trim();
    if (isValidBarcodeLength(trimmedBarcode.length)) {
      onConfirm(trimmedBarcode);
      setBarcode("");
      onClose();
    }
  };

  const handleClose = () => {
    setBarcode("");
    onClose();
  };

  const isValid = isValidBarcodeLength(barcode.trim().length);

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{t("title")}</Text>

          <Text style={styles.description}>{t("description")}</Text>

          <TextInput
            style={styles.input}
            value={barcode}
            onChangeText={setBarcode}
            placeholder={t("placeholder")}
            keyboardType="numeric"
            maxLength={EAN13_LENGTH}
            autoFocus
          />

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>{t("cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, !isValid && styles.confirmButtonDisabled]}
              onPress={handleConfirm}
              disabled={!isValid}
            >
              <Text
                style={[styles.confirmButtonText, !isValid && styles.confirmButtonTextDisabled]}
              >
                {t("confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
