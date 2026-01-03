import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./ManualBarcodeInputModal.styles";
import { EAN13_LENGTH } from "../../../constants/constants";
import { isBarcodeValid } from "./helpers";

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

  const isValid = useMemo(() => isBarcodeValid(barcode), [barcode]);

  const handleClose = useCallback(() => {
    setBarcode("");
    onClose();
  }, [onClose, setBarcode]);

  const handleConfirm = useCallback(() => {
    if (!isValid) return;

    onConfirm(barcode);
    handleClose();
  }, [barcode, handleClose, isValid, onConfirm]);

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
