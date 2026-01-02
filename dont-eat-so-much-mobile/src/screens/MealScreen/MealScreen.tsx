import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { styles } from "./MealScreen.styles";
import { DateBar } from "../../components/DateBar/DateBar";
import { FlashList } from "@shopify/flash-list";
import { useMealScreen } from "./hooks/useMealScreen";
import { ActivityIndicator } from "react-native-paper";
import { useCallback } from "react";
import { MAIN_COLOR } from "../../constants/colors";
import { MealCard } from "../../components/MealCard/MealCard";
import { ConsumedMeal } from "../../store/meal/types";
import { NutritionProgressBar } from "../../components/NutritionProgressBar/NutritionProgressBar";

const addProductIcon = require("../../assets/icons/addProduct.png");
const barCodeIcon = require("../../assets/icons/barCode.png");
const placeholderIcon = require("../../assets/icons/placeholder.png");

export const MealScreen = () => {
  const { t } = useTranslation("common", { keyPrefix: "meal" });
  const {
    onCardDeletePress,
    onCardLongPress,
    onCardPress,
    isLoading,
    consumedMeals,
    handleBarcodePress,
    resetDate,
  } = useMealScreen();

  const ListHeader = useCallback(
    () => (
      <View>
        <DateBar resetDate={resetDate} />
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={handleBarcodePress}>
            <Image style={styles.buttonIcon} source={barCodeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.buttonIcon} source={addProductIcon} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [resetDate, handleBarcodePress]
  );

  const EmptyList = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={MAIN_COLOR} />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Image source={placeholderIcon} style={styles.emptyPlaceholderIcon} />
        <Text style={styles.emptyTitle}>{t("noMealsTitle")}</Text>
        <Text style={styles.emptyDescription}>{t("noMealsDescription")}</Text>
      </View>
    );
  }, [isLoading, t]);

  const renderItem = useCallback(
    ({ item }: { item: ConsumedMeal }) => (
      <MealCard
        consumedMeal={item}
        onCardDeletePress={onCardDeletePress}
        onCardLongPress={() => onCardLongPress(item.meal, item.consumedMealId, item.amountInGrams)}
        onCardPress={() => onCardPress(item.meal, item.consumedMealId, item.amountInGrams)}
      />
    ),
    [onCardDeletePress, onCardLongPress, onCardPress]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={consumedMeals ?? []}
        keyExtractor={(item) => item.consumedMealId}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={<EmptyList />}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.progressBarContainer}>
        <NutritionProgressBar />
      </View>
    </SafeAreaView>
  );
};
