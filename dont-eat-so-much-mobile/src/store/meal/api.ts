import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";

import { baseApiQuery } from "../api";
import {
  AddConsumedMealRequest,
  EditConsumedMealRequest,
  Meal,
  SearchMealsResponse,
  SearchMealsParams,
  ConsumedMeal,
  CreateMealRequest,
} from "./types";
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
    createMeal: builder.mutation<Meal, CreateMealRequest>({
      query: (meal): FetchArgs => ({
        url: `/meals`,
        method: "POST",
        body: meal,
      }),
      extraOptions: { isPrivate: true },
    }),
    searchMeals: builder.query<SearchMealsResponse, SearchMealsParams>({
      query: (params): FetchArgs => {
        const { query, page, limit, onlyMyMeals } = params;
        const searchParams = new URLSearchParams();
        searchParams.append("q", query);
        if (page !== undefined) searchParams.append("page", page.toString());
        if (limit !== undefined) searchParams.append("limit", limit.toString());
        if (onlyMyMeals !== undefined) searchParams.append("onlyMyMeals", onlyMyMeals.toString());
        return {
          url: `/meals/search?${searchParams.toString()}`,
          method: "GET",
        };
      },
      extraOptions: { isPrivate: true },
    }),
    getConsumedMeals: builder.query<ConsumedMeal[], string>({
      query: (date): FetchArgs => ({
        url: `/consumed-meals/${encodeURIComponent(date)}`,
        method: "GET",
      }),
      extraOptions: { isPrivate: true },
      providesTags: (_result, _error, date) => [{ type: "ConsumedMeal" as const, id: date }],
    }),
    addConsumedMeal: builder.mutation<void, AddConsumedMealRequest>({
      query: (body): FetchArgs => ({
        url: `/consumed-meals`,
        method: "POST",
        body,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: (_result, _error, addConsumedMealRequest) => [
        { type: "ConsumedMeal" as const, id: addConsumedMealRequest.consumedAt },
      ],
    }),
    editConsumedMeal: builder.mutation<void, EditConsumedMealRequest>({
      query: ({ consumedMealId, ...body }): FetchArgs => ({
        url: `/consumed-meals/${encodeURIComponent(consumedMealId)}`,
        method: "PUT",
        body,
      }),
      extraOptions: { isPrivate: true },
      invalidatesTags: (_result, _error, { consumedMealId }) => [
        { type: "ConsumedMeal" as const, id: consumedMealId },
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
            const index = draft.findIndex((x) => x.consumedMealId === consumedMealId);
            if (index !== -1) {
              draft.splice(index, 1);
            }
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
  useLazySearchMealsQuery,
  useCreateMealMutation,
} = mealApi;
