import { useEffect } from "react";
import { selectSelectedDay } from "../../date/selectors";
import { useAppSelector } from "../../store";
import { useGetConsumedMealsQuery } from "../api";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useTranslation } from "react-i18next";

export const useGetConsumedMeals = () => {
  const selectedDay = useAppSelector(selectSelectedDay);
  const consumedAt = selectedDay.toISODate() ?? "";

  const { data, isLoading, error } = useGetConsumedMealsQuery(consumedAt, {
    skip: !consumedAt,
  });

  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  useEffect(() => {
    if (error && !data) {
      publish(t("unknownError"));
    }
  }, [error, data, publish, t]);

  return {
    isLoading,
    consumedMeals: data ?? [],
  };
};
