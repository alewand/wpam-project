import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";

import { baseApiQuery } from "../api";
import { AddConsumedMealRequest, EditConsumedMealRequest, Meal } from "./types";

export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery: baseApiQuery,
  tagTypes: ["MealBarcode"],
  endpoints: (builder) => ({
    getMealByBarcode: builder.query<Meal, string>({
      query: (barcode): FetchArgs => ({
        url: `/meals/barcode/${encodeURIComponent(barcode)}`,
        method: "GET",
      }),
      extraOptions: { isPrivate: true },
      providesTags: ["MealBarcode"],
    }),
    addConsumedMeal: builder.mutation<void, AddConsumedMealRequest>({
      query: (consumedMeal): FetchArgs => ({
        url: `/consumed-meals`,
        method: "POST",
        body: consumedMeal,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: ["MealBarcode"],
    }),
    editConsumedMeal: builder.mutation<void, EditConsumedMealRequest>({
      query: ({ consumedMealId, ...consumedMeal }): FetchArgs => ({
        url: `/consumed-meals/${encodeURIComponent(consumedMealId)}`,
        method: "PUT",
        body: consumedMeal,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: ["MealBarcode"],
    }),
  }),
});

export const {
  useLazyGetMealByBarcodeQuery,
  useAddConsumedMealMutation,
  useEditConsumedMealMutation,
} = mealApi;
