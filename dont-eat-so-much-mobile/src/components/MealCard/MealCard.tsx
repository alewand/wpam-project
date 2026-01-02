import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCalculateNutritions } from "../../hooks/useCalculateNutritions";
import { ConsumedMeal, Meal } from "../../store/meal/types";
import { styles } from "./MealCard.styles";

const deleteMealIcon = require("../../assets/icons/deleteMeal.png");
const placeholderIcon = require("../../assets/icons/placeholder.png");

export interface MealCardProps {
  consumedMeal: ConsumedMeal;
  onCardPress: (meal: Meal, amountInGrams?: number) => void;
  onCardLongPress: (meal: Meal, amountInGrams?: number) => void;
  onCardDeletePress: (consumedMealId: string) => void;
}

const formatNumber = (value: number): string => {
  if (value >= 10000) {
    const rounded = Math.round(value / 1000);
    return `${rounded}k`;
  }
  if (value >= 1000) {
    const rounded = Math.round(value / 100) / 10;
    return `${rounded}k`;
  }

  return value % 1 === 0 ? value.toString() : value.toFixed(1);
};

export const MealCard = ({
  consumedMeal,
  onCardPress,
  onCardLongPress,
  onCardDeletePress,
}: MealCardProps) => {
  const { t } = useTranslation("common", { keyPrefix: "meal" });
  const { consumedMealId, amountInGrams, meal } = consumedMeal;
  const { name, brand, imageUrl } = meal;
  const { nutritions } = useCalculateNutritions({ grams: amountInGrams, meal });
  const { energyKcal, protein, fat, carbohydrates } = nutritions;

  return (
    <TouchableOpacity
      onPress={() => onCardPress(meal, amountInGrams)}
      onLongPress={() => onCardLongPress(meal, amountInGrams)}
      style={styles.card}
    >
      <TouchableOpacity
        onPress={() => onCardDeletePress(consumedMealId)}
        style={styles.deleteButton}
      >
        <Image source={deleteMealIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
      <View style={styles.left}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Image source={placeholderIcon} style={styles.placeholderIcon} />
          </View>
        )}
      </View>
      <View style={styles.right}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        {brand && (
          <Text style={styles.brand} numberOfLines={1} ellipsizeMode="tail">
            {brand}
          </Text>
        )}
        <Text style={styles.grams}>{amountInGrams} g</Text>
        <View style={styles.pillsRow}>
          <View style={[styles.pill, styles.pillKcal]}>
            <Text style={styles.pillTextKcal} numberOfLines={1} adjustsFontSizeToFit>
              {formatNumber(energyKcal)} kcal
            </Text>
          </View>
          <View style={[styles.pill, styles.pillProtein]}>
            <Text style={styles.pillTextProtein} numberOfLines={1} adjustsFontSizeToFit>
              {t("proteinShort")} {formatNumber(protein)}
            </Text>
          </View>
          <View style={[styles.pill, styles.pillCarbs]}>
            <Text style={styles.pillTextCarbs} numberOfLines={1} adjustsFontSizeToFit>
              {t("carbsShort")} {formatNumber(carbohydrates)}
            </Text>
          </View>
          <View style={[styles.pill, styles.pillFat]}>
            <Text style={styles.pillTextFat} numberOfLines={1} adjustsFontSizeToFit>
              {t("fatShort")} {formatNumber(fat)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
