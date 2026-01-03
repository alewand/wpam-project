import { View, Text, Modal, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useTranslation } from "react-i18next";
import { styles } from "./NutritionModal.styles";
import {
  GRAY_LIGHT,
  MAIN_COLOR,
  ERROR,
  SATURATED_FAT_COLOR,
  SUGARS_COLOR,
  FIBER_COLOR,
  SALT_COLOR,
  SODIUM_COLOR,
} from "../../../constants/colors";
import { getMacroLetterStyle, getTintColor } from "../NutritionProgressBar.styles";
import type { NutritionProgress } from "../hooks/useNutritionProgress";

const getColorForMacro = (macroType: string): string => {
  switch (macroType) {
    case "saturatedFat":
      return SATURATED_FAT_COLOR;
    case "sugars":
      return SUGARS_COLOR;
    case "fiber":
      return FIBER_COLOR;
    case "salt":
      return SALT_COLOR;
    case "sodium":
      return SODIUM_COLOR;
    default:
      return MAIN_COLOR;
  }
};

interface NutritionModalProps {
  visible: boolean;
  onClose: () => void;
  progress: NutritionProgress;
}

export const NutritionModal = ({ visible, onClose, progress }: NutritionModalProps) => {
  const { t: tMeal } = useTranslation("common", { keyPrefix: "meal" });
  const { t: tConsumedMeal } = useTranslation("common", { keyPrefix: "consumedMeal" });
  const { width } = useWindowDimensions();

  const circleSize = width < 400 ? 70 : 80;
  const strokeWidth = 6;

  const formatNumber = (value: number): string => {
    if (value >= 1000) {
      return `${Math.round(value / 100) / 10}k`;
    }
    return value % 1 === 0 ? value.toString() : value.toFixed(1);
  };

  const renderCircle = (
    label: string,
    progressItem: { current: number; limit: number; progress: number; isExceeded: boolean },
    macroType:
      | "calories"
      | "protein"
      | "carbs"
      | "fat"
      | "saturatedFat"
      | "sugars"
      | "fiber"
      | "salt"
      | "sodium",
    showLetter = false
  ) => {
    const isAdditionalMacro = ["saturatedFat", "sugars", "fiber", "salt", "sodium"].includes(
      macroType
    );
    const color = isAdditionalMacro
      ? getColorForMacro(macroType)
      : progressItem.isExceeded
        ? ERROR
        : ["calories", "protein", "carbs", "fat"].includes(macroType)
          ? getTintColor(
              progressItem.isExceeded,
              macroType as "calories" | "protein" | "carbs" | "fat"
            )
          : getColorForMacro(macroType);

    return (
      <View style={styles.circleContainer}>
        <AnimatedCircularProgress
          size={circleSize}
          width={strokeWidth}
          fill={isAdditionalMacro ? 100 : Math.min(progressItem.progress * 100, 100)}
          tintColor={color}
          backgroundColor={GRAY_LIGHT}
          rotation={0}
          lineCap="round"
          prefill={0}
        >
          {() => (
            <View style={styles.circleContent}>
              {showLetter ? (
                <Text
                  style={
                    macroType === "protein"
                      ? getMacroLetterStyle(progressItem.isExceeded, "protein")
                      : macroType === "carbs"
                        ? getMacroLetterStyle(progressItem.isExceeded, "carbs")
                        : macroType === "fat"
                          ? getMacroLetterStyle(progressItem.isExceeded, "fat")
                          : styles.circleLabel
                  }
                >
                  {label}
                </Text>
              ) : (
                <Text style={styles.circleLabel}>{label}</Text>
              )}
            </View>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.circleValue}>
          {isAdditionalMacro
            ? formatNumber(progressItem.current)
            : `${formatNumber(progressItem.current)} / ${formatNumber(progressItem.limit)}`}
        </Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{tConsumedMeal("nutritionsTitle")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.circlesGrid}>
              {renderCircle("kcal", progress.calories, "calories")}
              {renderCircle(tMeal("proteinShort"), progress.protein, "protein", true)}
              {renderCircle(tMeal("carbsShort"), progress.carbs, "carbs", true)}
              {renderCircle(tMeal("fatShort"), progress.fat, "fat", true)}
            </View>
            {(progress.saturatedFat ||
              progress.sugars ||
              progress.fiber ||
              progress.salt ||
              progress.sodium) && (
              <View style={styles.additionalSection}>
                <View style={styles.circlesGrid}>
                  {progress.saturatedFat &&
                    renderCircle(
                      tConsumedMeal("saturatedFat"),
                      progress.saturatedFat,
                      "saturatedFat"
                    )}
                  {progress.sugars &&
                    renderCircle(tConsumedMeal("sugars"), progress.sugars, "sugars")}
                  {progress.fiber && renderCircle(tConsumedMeal("fiber"), progress.fiber, "fiber")}
                  {progress.salt && renderCircle(tConsumedMeal("salt"), progress.salt, "salt")}
                  {progress.sodium &&
                    renderCircle(tConsumedMeal("sodium"), progress.sodium, "sodium")}
                </View>
              </View>
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
