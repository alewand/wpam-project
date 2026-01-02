import { memo, useMemo } from "react";
import { Nutritions } from "../../../store/meal/types";
import { Text, View } from "react-native";
import { styles } from "./NutritionsView.styles";
import { useTranslation } from "react-i18next";

export interface NutritionsViewProps {
  nutritions: Nutritions;
}

type Row = { label: string; value: string };

const RowView = memo(({ label, value }: Row) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
});

RowView.displayName = "RowView";

export const NutritionsView = memo(({ nutritions }: NutritionsViewProps) => {
  const { t } = useTranslation("common", { keyPrefix: "consumedMeal" });

  const rows = useMemo<Row[]>(() => {
    const base: Row[] = [
      { label: t("calories"), value: `${Math.round(nutritions.energyKcal)} kcal` },
      { label: t("protein"), value: `${nutritions.protein} g` },
      { label: t("fat"), value: `${nutritions.fat} g` },
      { label: t("carbohydrates"), value: `${nutritions.carbohydrates} g` },
    ];

    const optional: Row[] = [];

    if (nutritions.saturatedFat != null)
      optional.push({ label: t("saturatedFat"), value: `${nutritions.saturatedFat} g` });
    if (nutritions.sugars != null)
      optional.push({ label: t("sugars"), value: `${nutritions.sugars} g` });
    if (nutritions.fiber != null)
      optional.push({ label: t("fiber"), value: `${nutritions.fiber} g` });
    if (nutritions.salt != null) optional.push({ label: t("salt"), value: `${nutritions.salt} g` });
    if (nutritions.sodium != null)
      optional.push({ label: t("sodium"), value: `${nutritions.sodium} g` });

    return [...base, ...optional];
  }, [
    t,
    nutritions.energyKcal,
    nutritions.protein,
    nutritions.fat,
    nutritions.carbohydrates,
    nutritions.saturatedFat,
    nutritions.sugars,
    nutritions.fiber,
    nutritions.salt,
    nutritions.sodium,
  ]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t("nutritionsTitle")}</Text>

      <View style={styles.list}>
        {rows.map((r) => (
          <RowView key={r.label} label={r.label} value={r.value} />
        ))}
      </View>
    </View>
  );
});

NutritionsView.displayName = "NutritionsView";
