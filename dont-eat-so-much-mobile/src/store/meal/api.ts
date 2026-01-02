import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";

import { baseApiQuery } from "../api";
import { AddConsumedMealRequest, ConsumedMeal, EditConsumedMealRequest, Meal } from "./types";
import { selectSelectedDay } from "../date/selectors";
import { RootState } from "../store";

export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery: baseApiQuery,
  tagTypes: ["MealBarcode", "ConsumedMeal"],
  endpoints: (builder) => ({
    getMealByBarcode: builder.query<Meal, string>({
      query: (barcode): FetchArgs => ({
        url: `/meals/barcode/${encodeURIComponent(barcode)}`,
        method: "GET",
      }),
      extraOptions: { isPrivate: true },
      providesTags: (result, error, barcode) => [{ type: "MealBarcode" as const, id: barcode }],
    }),
    getConsumedMeals: builder.query<ConsumedMeal[], string>({
      query: (date): FetchArgs => ({
        url: `/consumed-meals/${encodeURIComponent(date)}`,
        method: "GET",
      }),
      extraOptions: { isPrivate: true },
      providesTags: (result, error, date) => [{ type: "ConsumedMeal" as const, id: date }],
    }),
    addConsumedMeal: builder.mutation<void, AddConsumedMealRequest>({
      query: (consumedMeal): FetchArgs => ({
        url: `/consumed-meals`,
        method: "POST",
        body: consumedMeal,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: (result, error, consumedMeal) => [
        { type: "ConsumedMeal" as const, id: consumedMeal.consumedAt },
      ],
    }),
    editConsumedMeal: builder.mutation<void, EditConsumedMealRequest>({
      query: ({ consumedMealId, ...rest }): FetchArgs => ({
        url: `/consumed-meals/${encodeURIComponent(consumedMealId)}`,
        method: "PUT",
        body: rest,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: (result, error, editRequest) => [
        { type: "ConsumedMeal" as const, id: editRequest.consumedAt },
      ],
    }),
    deleteConsumedMeal: builder.mutation<void, string>({
      query: (consumedMealId): FetchArgs => ({
        url: `/consumed-meals/${encodeURIComponent(consumedMealId)}`,
        method: "DELETE",
      }),
      extraOptions: { isPrivate: true },
      async onQueryStarted(consumedMealId, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState;
        const selectedDay = selectSelectedDay(state).toISODate() ?? "";
        const patchResult = dispatch(
          mealApi.util.updateQueryData("getConsumedMeals", selectedDay, (draft) => {
            const idx = draft.findIndex((x) => x.consumedMealId === consumedMealId);
            if (idx !== -1) draft.splice(idx, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useLazyGetMealByBarcodeQuery,
  useAddConsumedMealMutation,
  useEditConsumedMealMutation,
  useDeleteConsumedMealMutation,
  useLazyGetConsumedMealsQuery,
  useGetConsumedMealsQuery,
} = mealApi;
