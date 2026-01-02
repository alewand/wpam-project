import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/Navigation";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_GRAMS } from "../../../constants/constants";
import { upperCaseFirstLetter } from "../../../utils/helpers";
import { useCalculateNutritions } from "./useCalculateNutritions";
import { useAddConsumedMeal } from "../../../store/meal/api/useAddConsumedMeal";

export const useConsumedMealScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ConsumedMeal">>();
  const { t } = useTranslation("common", { keyPrefix: "consumedMeal" });

  const meal = route.params.meal;
  const action = route.params.action;

  const [grams, setGrams] = useState<number>(DEFAULT_GRAMS);

  const { nutritions } = useCalculateNutritions({ grams, meal });
  const { addConsumedMeal, isLoading } = useAddConsumedMeal();

  const addConsumedMealAction = useCallback(
    async () => addConsumedMeal(meal.mealId, grams),
    [addConsumedMeal, meal.mealId, grams]
  );

  const headerTitle = action === "add" ? t("addMealTitle") : t("editMealTitle");
  const confirmButtonName = action === "add" ? t("addButton") : t("saveButton");
  const isConfirmButtonDisabled = grams <= 0;

  const actionMutation = action === "add" ? addConsumedMealAction : () => Promise.resolve();
  const isActionLoading = action === "add" ? isLoading : false;

  return {
    grams,
    setGrams,
    mealName: upperCaseFirstLetter(meal.name),
    mealBrand: upperCaseFirstLetter(meal.brand),
    nutritions,
    headerTitle,
    confirmButtonName,
    isConfirmButtonDisabled,
    action: actionMutation,
    actionType: action,
    isLoading: isActionLoading,
  };
};
