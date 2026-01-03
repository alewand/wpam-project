import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigation, RootStackParamList } from "../../../navigation/Navigation";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_GRAMS } from "../../../constants/constants";
import { upperCaseFirstLetter } from "../../../utils/helpers";
import { useCalculateNutritions } from "../../../hooks/useCalculateNutritions";
import { useAddConsumedMeal } from "../../../store/meal/api/useAddConsumedMeal";
import { useEditConsumedMeal } from "../../../store/meal/api/useEditConsumedMeal";

export const useConsumedMealScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const route = useRoute<RouteProp<RootStackParamList, "ConsumedMeal">>();
  const { t } = useTranslation("common", { keyPrefix: "consumedMeal" });

  const meal = route.params.meal;
  const action = route.params.action;
  const consumedMealId = route.params.consumedMealId;
  const amountInGrams = route.params.amountInGrams;
  const source = route.params.source;

  const [grams, setGrams] = useState<number>(amountInGrams ?? DEFAULT_GRAMS);

  const { nutritions } = useCalculateNutritions({ grams, meal });
  const { addConsumedMeal, isLoading: isAddLoading } = useAddConsumedMeal();
  const { editConsumedMeal, isLoading: isEditLoading } = useEditConsumedMeal();

  const addConsumedMealAction = useCallback(
    async () => addConsumedMeal(meal.mealId, grams),
    [addConsumedMeal, meal.mealId, grams]
  );

  const editConsumedMealAction = useCallback(async () => {
    if (!consumedMealId || !amountInGrams) return;
    await editConsumedMeal(consumedMealId, meal.mealId, grams);
  }, [editConsumedMeal, consumedMealId, meal.mealId, grams]);

  const headerTitle =
    action === "add"
      ? t("addMealTitle")
      : action === "edit"
        ? t("editMealTitle")
        : t("viewMealTitle");

  const confirmButtonName = action === "add" ? t("addButton") : t("saveButton");
  const isConfirmButtonDisabled = grams <= 0;

  const actionMutation = action === "add" ? addConsumedMealAction : editConsumedMealAction;
  const isActionLoading = action === "add" ? isAddLoading : isEditLoading;

  const goBack = useCallback(() => {
    if (source === "SearchMeal") {
      if (navigation.canGoBack()) navigation.goBack();
    } else {
      navigation.navigate("BottomTabs", { screen: "Meal", params: { resetDate: false } });
    }
  }, [navigation, source]);

  return {
    grams,
    setGrams,
    mealName: upperCaseFirstLetter(meal.name),
    mealBrand: upperCaseFirstLetter(meal.brand),
    mealImageUrl: meal.imageUrl,
    nutritions,
    headerTitle,
    confirmButtonName,
    isConfirmButtonDisabled,
    action: actionMutation,
    actionType: action,
    isLoading: isActionLoading,
    goBack,
  };
};
