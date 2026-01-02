import { useCallback } from "react";
import { useLazyGetMealByBarcodeQuery } from "../api";
import type { Meal } from "../types";
import { getErrorStatus } from "../../helpers";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export const useGetMealByBarcode = () => {
  const [trigger, { isLoading }] = useLazyGetMealByBarcodeQuery();

  const getMealByBarcode = useCallback(
    async (
      barcode: string
    ): Promise<{
      meal: Meal | null;
      error: "not-found" | "network-error" | null;
    }> => {
      try {
        const meal = await trigger(barcode, true).unwrap();
        return { meal, error: null };
      } catch (error) {
        const status = getErrorStatus(error as FetchBaseQueryError | SerializedError);

        if (status === 404) {
          return { meal: null, error: "not-found" };
        }

        return { meal: null, error: "network-error" };
      }
    },
    [trigger]
  );

  return { getMealByBarcode, isLoading };
};
