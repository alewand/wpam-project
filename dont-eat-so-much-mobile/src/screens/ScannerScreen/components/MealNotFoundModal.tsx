import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./MealNotFoundModal.styles";

interface MealNotFoundModalProps {
  isVisible: boolean;
  onClose: () => void;
  barcode?: string | null;
}

export const MealNotFoundModal = ({ isVisible, onClose, barcode }: MealNotFoundModalProps) => {
  const { t } = useTranslation("common", { keyPrefix: "scanner.mealNotFound" });

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{t("title")}</Text>

          <Text style={styles.description}>{t("description")}</Text>

          <View style={styles.barcodeRow}>
            <Text style={styles.barcodeText} numberOfLines={1}>
              {t("barcodeLabel")} {barcode}
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
