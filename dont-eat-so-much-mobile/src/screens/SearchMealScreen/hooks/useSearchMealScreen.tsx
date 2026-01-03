import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { Meal } from "../../../store/meal/types";
import { useSearchMeals } from "../../../store/meal/api/useSearchMeals";

const DEBOUNCE_DELAY = 600;

export const useSearchMealScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyMyMeals, setOnlyMyMeals] = useState(false);
  const {
    searchMeals,
    isLoading,
    isLoadingMore,
    meals: allMeals,
    data,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    searchNextPage,
    searchPreviousPage,
  } = useSearchMeals();
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousQueryRef = useRef<string>("");
  const previousOnlyMyMealsRef = useRef<boolean>(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      searchMeals({ query: "", page: 1, onlyMyMeals: onlyMyMeals || undefined }, false);
      return;
    }

    const trimmedQuery = searchQuery.trim();
    const queryChanged = previousQueryRef.current !== trimmedQuery;
    const filterChanged = previousOnlyMyMealsRef.current !== onlyMyMeals;

    if (!queryChanged && !filterChanged) {
      return;
    }

    previousQueryRef.current = trimmedQuery;
    previousOnlyMyMealsRef.current = onlyMyMeals;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      searchMeals({ query: trimmedQuery, page: 1, onlyMyMeals: onlyMyMeals || undefined }, false);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery, onlyMyMeals, searchMeals]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoadingMore && !isLoading) {
      searchNextPage();
    }
  }, [hasNextPage, isLoadingMore, isLoading, searchNextPage]);

  const handleMealPress = useCallback(
    (meal: Meal) => {
      navigation.navigate("ConsumedMeal", {
        meal,
        action: "add",
        source: "SearchMeal",
      });
    },
    [navigation]
  );

  const handleAddCustomPress = useCallback(() => {
    navigation.navigate("AddMeal");
  }, [navigation]);

  const handleSearchQueryChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  return {
    searchQuery,
    setSearchQuery: handleSearchQueryChange,
    onlyMyMeals,
    setOnlyMyMeals,
    meals: allMeals,
    isLoading,
    isLoadingMore,
    handleMealPress,
    handleAddCustomPress,
    handleLoadMore,
    currentPage,
    totalPages: data?.totalPages ?? 0,
    total: data?.total ?? 0,
    hasNextPage,
    hasPreviousPage,
    searchNextPage,
    searchPreviousPage,
  };
};
