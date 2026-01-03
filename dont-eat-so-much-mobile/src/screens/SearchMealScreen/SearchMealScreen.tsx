import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { styles } from "./SearchMealScreen.styles";
import { useSearchMealScreen } from "./hooks/useSearchMealScreen";
import { Meal } from "../../store/meal/types";
import { SmallMealCard } from "../../components/SmallMealCard/SmallMealCard";
import { MAIN_COLOR } from "../../constants/colors";
import { Header } from "../../components/Header/Header";

const placeholderIcon = require("../../assets/icons/placeholder.png");

export const SearchMealScreen = () => {
  const { t } = useTranslation("common", { keyPrefix: "searchMeal" });
  const {
    searchQuery,
    setSearchQuery,
    onlyMyMeals,
    setOnlyMyMeals,
    meals,
    isLoading,
    isLoadingMore,
    handleMealPress,
    handleAddCustomPress,
    handleLoadMore,
  } = useSearchMealScreen();

  const ListHeader = useCallback(
    () => (
      <View>
        <TouchableOpacity style={styles.addCustomButton} onPress={handleAddCustomPress}>
          <Text style={styles.addCustomButtonText}>{t("addCustom")}</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleAddCustomPress, t]
  );

  const renderItem = useCallback(
    ({ item }: { item: Meal }) => <SmallMealCard meal={item} onPress={handleMealPress} />,
    [handleMealPress]
  );

  const ListEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={MAIN_COLOR} />
        ) : (
          <>
            <Image source={placeholderIcon} style={styles.emptyPlaceholderIcon} />
            <Text style={styles.emptyText}>{t("noMealsFound")}</Text>
          </>
        )}
      </View>
    ),
    [isLoading, t]
  );

  const ListFooter = useCallback(
    () =>
      isLoadingMore ? (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color={MAIN_COLOR} />
        </View>
      ) : null,
    [isLoadingMore]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("title")} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setOnlyMyMeals(!onlyMyMeals)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, onlyMyMeals && styles.checkboxChecked]}>
            {onlyMyMeals && <Text style={styles.checkboxCheckmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>{t("onlyMyMeals")}</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={meals}
        keyExtractor={(item) => item.mealId}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<ListEmpty />}
        ListFooterComponent={<ListFooter />}
      />
    </SafeAreaView>
  );
};
