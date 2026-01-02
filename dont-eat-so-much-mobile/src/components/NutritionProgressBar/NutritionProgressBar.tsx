import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useState, useCallback } from "react";
import { styles, getMacroLetterStyle, getTintColor } from "./NutritionProgressBar.styles";
import { GRAY_LIGHT } from "../../constants/colors";
import { useNutritionProgress } from "./hooks/useNutritionProgress";
import { useTranslation } from "react-i18next";
import { NutritionModal } from "./components/NutritionModal";

export const NutritionProgressBar = () => {
  const progress = useNutritionProgress();
  const { width } = useWindowDimensions();
  const { t } = useTranslation("common", { keyPrefix: "meal" });
  const [isNutritionModalVisible, setIsNutritionModalVisible] = useState(false);

  const circleSize = width < 400 ? 50 : 60;
  const strokeWidth = 4;

  const formatNumber = useCallback((value: number): string => {
    if (value >= 1000) {
      return `${Math.round(value / 100) / 10}k`;
    }
    return value % 1 === 0 ? value.toString() : value.toFixed(1);
  }, []);

  const renderCircle = useCallback(
    (
      progressItem: { current: number; limit: number; progress: number; isExceeded: boolean },
      macroType: "calories" | "protein" | "carbs" | "fat",
      label: string,
      isCalories = false
    ) => {
      const containerStyle = isCalories ? styles.caloriesContainer : styles.macroItem;
      const contentStyle = isCalories ? styles.caloriesContent : styles.macroContent;
      const labelStyle = isCalories
        ? styles.caloriesLabel
        : getMacroLetterStyle(progressItem.isExceeded, macroType as "protein" | "carbs" | "fat");
      const valueStyle = isCalories ? styles.caloriesValue : styles.macroValue;

      return (
        <View style={containerStyle}>
          <AnimatedCircularProgress
            size={circleSize}
            width={strokeWidth}
            fill={progressItem.progress * 100}
            tintColor={getTintColor(progressItem.isExceeded, macroType)}
            backgroundColor={GRAY_LIGHT}
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View style={contentStyle}>
                <Text style={labelStyle}>{label}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={valueStyle}>
            {formatNumber(progressItem.current)} / {formatNumber(progressItem.limit)}
          </Text>
        </View>
      );
    },
    [circleSize, strokeWidth, formatNumber, t]
  );

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsNutritionModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.row}>
          {renderCircle(progress.calories, "calories", "kcal", true)}
          {renderCircle(progress.protein, "protein", t("proteinShort").replace(".", ""))}
          {renderCircle(progress.carbs, "carbs", t("carbsShort").replace(".", ""))}
          {renderCircle(progress.fat, "fat", t("fatShort").replace(".", ""))}
        </View>
      </TouchableOpacity>
      <NutritionModal
        visible={isNutritionModalVisible}
        onClose={() => setIsNutritionModalVisible(false)}
        progress={progress}
      />
    </>
  );
};
