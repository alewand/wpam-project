import { useCallback } from "react";
import { useLazyGetMealByBarcodeQuery } from "../api";
import type { Meal } from "../types";

export const useGetMealByBarcode = () => {
  const [trigger, { isLoading }] = useLazyGetMealByBarcodeQuery();

  const getMealByBarcode = useCallback(
    async (barcode: string): Promise<Meal | null> => {
      try {
        return await trigger(barcode, false).unwrap();
      } catch {
        return null;
      }
    },
    [trigger]
  );

  return { getMealByBarcode, isLoading };
};
