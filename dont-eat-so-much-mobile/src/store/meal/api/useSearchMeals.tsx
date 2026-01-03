import { useCallback, useState, useRef } from "react";
import { useLazySearchMealsQuery } from "../api";
import type { SearchMealsResponse, SearchMealsParams, Meal } from "../types";

export const useSearchMeals = () => {
  const [trigger, { isLoading, error }] = useLazySearchMealsQuery();
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentOnlyMyMeals, setCurrentOnlyMyMeals] = useState<boolean | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingMoreRef = useRef(false);

  const searchMeals = useCallback(
    async (
      params: SearchMealsParams,
      append: boolean = false
    ): Promise<SearchMealsResponse | null> => {
      try {
        if (append) {
          setIsLoadingMore(true);
          isLoadingMoreRef.current = true;
        }

        const result = await trigger(params).unwrap();
        setCurrentPage(params.page ?? 1);
        setCurrentQuery(params.query);
        setCurrentOnlyMyMeals(params.onlyMyMeals);
        setTotalPages(result.totalPages);
        setTotal(result.total);
        setLimit(result.limit);

        if (append) {
          setAllMeals((prev) => [...prev, ...result.meals]);
        } else {
          setAllMeals(result.meals);
        }

        setIsLoadingMore(false);
        isLoadingMoreRef.current = false;
        return result;
      } catch {
        setIsLoadingMore(false);
        isLoadingMoreRef.current = false;
        return null;
      }
    },
    [trigger]
  );

  const searchNextPage = useCallback(async () => {
    if (isLoadingMoreRef.current || !totalPages || currentPage >= totalPages) {
      return null;
    }

    return searchMeals(
      {
        query: currentQuery,
        page: currentPage + 1,
        limit,
        onlyMyMeals: currentOnlyMyMeals,
      },
      true
    );
  }, [currentPage, currentQuery, currentOnlyMyMeals, limit, totalPages, searchMeals]);

  const searchPreviousPage = useCallback(async () => {
    if (currentPage <= 1) {
      return null;
    }

    return searchMeals({
      query: currentQuery,
      page: currentPage - 1,
      limit,
      onlyMyMeals: currentOnlyMyMeals,
    });
  }, [currentPage, currentQuery, currentOnlyMyMeals, limit, searchMeals]);

  return {
    searchMeals,
    searchNextPage,
    searchPreviousPage,
    isLoading,
    isLoadingMore,
    meals: allMeals,
    data: {
      meals: allMeals,
      total,
      page: currentPage,
      limit,
      totalPages,
    },
    error,
    currentPage,
    hasNextPage: totalPages > 0 && currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};
