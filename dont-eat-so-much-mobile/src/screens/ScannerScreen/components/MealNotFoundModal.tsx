import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./MealNotFoundModal.styles";

interface MealNotFoundModalProps {
  isMealNotFoundModalVisible: boolean;
  onClose: () => void;
  barcode?: string | null;
}

export const MealNotFoundModal = ({
  isMealNotFoundModalVisible,
  onClose,
  barcode,
}: MealNotFoundModalProps) => {
  const { t } = useTranslation("common", { keyPrefix: "scanner.mealNotFound" });

  return (
    <Modal
      visible={isMealNotFoundModalVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{t("title")}</Text>

          <Text style={styles.description}>{t("description")}</Text>

          <View style={styles.barcodeRow}>
            <Text style={styles.barcodeLabel}>{t("barcodeLabel")}</Text>
            <Text style={styles.barcodeValue} numberOfLines={1}>
              {barcode}
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
