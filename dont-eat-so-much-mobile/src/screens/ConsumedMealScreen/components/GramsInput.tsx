import { Dispatch, SetStateAction, useCallback } from "react";
import { DEFAULT_GRAMS, MAX_GRAMS } from "../../../constants/constants";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./GramsInput.styles";
import { useTranslation } from "react-i18next";

const STEP = 10;
const MIN = 0;
const MAX = MAX_GRAMS;
const DEFAULT = DEFAULT_GRAMS;

export interface GramsInputProps {
  grams: number;
  setGrams: Dispatch<SetStateAction<number>>;
  readOnly?: boolean;
}

export const GramsInput = ({ grams, setGrams, readOnly = false }: GramsInputProps) => {
  const { t } = useTranslation("common", { keyPrefix: "consumedMeal" });

  const clampGrams = useCallback((value: number) => {
    return Math.min(Math.max(value, MIN), MAX);
  }, []);

  const onGramsApply = useCallback(
    (deltaGrams: number) => setGrams((prev) => clampGrams(prev + deltaGrams)),
    [clampGrams, setGrams]
  );

  const onGramsChange = useCallback(
    (gramsAsText: string) => {
      const gramsAsNumber = parseInt(gramsAsText || "0", 10);
      setGrams(clampGrams(Number.isFinite(gramsAsNumber) ? gramsAsNumber : DEFAULT_GRAMS));
    },
    [clampGrams, setGrams]
  );

  const resetGrams = useCallback(() => {
    setGrams(DEFAULT);
  }, [setGrams]);

  const isDecreaseDisabled = grams <= MIN;
  const isIncreaseDisabled = grams >= MAX;
  const isResetDisabled = grams === DEFAULT;

  return (
    <View style={styles.container}>
      <Text style={styles.gramsLabel}>{t("amountInGrams")}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => onGramsApply(-STEP)}
          disabled={isDecreaseDisabled || readOnly}
          style={[
            styles.applyButton,
            (isDecreaseDisabled || readOnly) && styles.applyButtonDisabled,
          ]}
        >
          <Text style={styles.applyButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          keyboardType="numeric"
          value={`${grams.toString()}`}
          onChangeText={onGramsChange}
          style={styles.input}
          editable={!readOnly}
        />
        <TouchableOpacity
          onPress={() => onGramsApply(STEP)}
          disabled={isIncreaseDisabled || readOnly}
          style={[
            styles.applyButton,
            (isIncreaseDisabled || readOnly) && styles.applyButtonDisabled,
          ]}
        >
          <Text style={styles.applyButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {!readOnly && (
        <TouchableOpacity
          onPress={resetGrams}
          disabled={isResetDisabled}
          style={[styles.resetButton, isResetDisabled && styles.resetButtonDisabled]}
        >
          <Text style={[styles.resetText, isResetDisabled && styles.resetTextDisabled]}>
            {t("reset")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
