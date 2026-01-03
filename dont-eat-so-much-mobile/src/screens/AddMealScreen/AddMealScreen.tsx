import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { styles } from "./AddMealScreen.styles";
import { useAddMealScreen } from "./hooks/useAddMealScreen";
import { Header } from "../../components/Header/Header";
import { WHITE } from "../../constants/colors";
import { Formik, FormikErrors } from "formik";
import * as Yup from "yup";
import type { CreateMealRequest } from "../../store/meal/types";
import { FormField } from "../../components/FormField/FormField";
import { isBarcodeValid } from "../ScannerScreen/components/helpers";

export const AddMealScreen = () => {
  const { t } = useTranslation("common", { keyPrefix: "addMeal" });
  const { handleSubmit, isLoading } = useAddMealScreen();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name.required"),
    barcode: Yup.string().test("barcode", "barcode.invalid", (value) => {
      if (!value || value.trim() === "") return true;
      return isBarcodeValid(value.trim());
    }),
    energyKcalPer100g: Yup.number()
      .min(0, "energyKcal.invalid")
      .max(9999, "energyKcal.invalid")
      .required("energyKcal.required"),
    proteinPer100g: Yup.number()
      .min(0, "protein.invalid")
      .max(100, "protein.invalid")
      .required("protein.required"),
    fatPer100g: Yup.number().min(0, "fat.invalid").max(100, "fat.invalid").required("fat.required"),
    carbohydratesPer100g: Yup.number()
      .min(0, "carbohydrates.invalid")
      .max(100, "carbohydrates.invalid")
      .required("carbohydrates.required"),
    saturatedFatPer100g: Yup.number()
      .min(0, "saturatedFat.invalid")
      .max(100, "saturatedFat.invalid")
      .nullable(),
    sugarsPer100g: Yup.number().min(0, "sugars.invalid").max(100, "sugars.invalid").nullable(),
    fiberPer100g: Yup.number().min(0, "fiber.invalid").max(100, "fiber.invalid").nullable(),
    saltPer100g: Yup.number().min(0, "salt.invalid").max(100, "salt.invalid").nullable(),
    sodiumPer100g: Yup.number().min(0, "sodium.invalid").max(100000, "sodium.invalid").nullable(),
  });

  const initialValues: CreateMealRequest = {
    name: "",
    brand: "",
    barcode: "",
    energyKcalPer100g: 0,
    proteinPer100g: 0,
    fatPer100g: 0,
    carbohydratesPer100g: 0,
    saturatedFatPer100g: null,
    sugarsPer100g: null,
    fiberPer100g: null,
    saltPer100g: null,
    sodiumPer100g: null,
  };

  const isFormButtonDisabled = (
    values: CreateMealRequest,
    errors: FormikErrors<CreateMealRequest>,
    isLoading: boolean
  ) => {
    return (
      isLoading ||
      !values.name ||
      values.name.trim() === "" ||
      values.energyKcalPer100g <= 0 ||
      values.proteinPer100g < 0 ||
      values.fatPer100g < 0 ||
      values.carbohydratesPer100g < 0 ||
      Object.keys(errors).length > 0
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("title")} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, handleBlur, submitForm, values, errors, touched, setFieldValue }) => (
              <View style={styles.formContainer}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("name")} *</Text>
                  <FormField
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    placeholder={t("namePlaceholder")}
                    error={errors.name}
                    touched={touched.name}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("brand")}</Text>
                  <FormField
                    value={values.brand || ""}
                    onChangeText={handleChange("brand")}
                    placeholder={t("brandPlaceholder")}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("barcode")}</Text>
                  <FormField
                    value={values.barcode || ""}
                    onChangeText={handleChange("barcode")}
                    onBlur={handleBlur("barcode")}
                    placeholder={t("barcodePlaceholder")}
                    keyboardType="numeric"
                    error={errors.barcode}
                    touched={touched.barcode}
                  />
                </View>

                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>{t("requiredNutritions")}</Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("energyKcalPer100g")} *</Text>
                  <FormField
                    value={values.energyKcalPer100g.toString()}
                    onChangeText={(text) => {
                      const numValue = text === "" ? 0 : parseFloat(text);
                      if (!isNaN(numValue)) {
                        setFieldValue("energyKcalPer100g", numValue);
                      }
                    }}
                    onBlur={handleBlur("energyKcalPer100g")}
                    placeholder={t("energyKcalPlaceholder")}
                    keyboardType="numeric"
                    error={errors.energyKcalPer100g}
                    touched={touched.energyKcalPer100g}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("proteinPer100g")} *</Text>
                  <FormField
                    value={values.proteinPer100g.toString()}
                    onChangeText={(text) => {
                      const numValue = text === "" ? 0 : parseFloat(text);
                      if (!isNaN(numValue)) {
                        setFieldValue("proteinPer100g", numValue);
                      }
                    }}
                    onBlur={handleBlur("proteinPer100g")}
                    placeholder={t("proteinPlaceholder")}
                    keyboardType="numeric"
                    error={errors.proteinPer100g}
                    touched={touched.proteinPer100g}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("fatPer100g")} *</Text>
                  <FormField
                    value={values.fatPer100g.toString()}
                    onChangeText={(text) => {
                      const numValue = text === "" ? 0 : parseFloat(text);
                      if (!isNaN(numValue)) {
                        setFieldValue("fatPer100g", numValue);
                      }
                    }}
                    onBlur={handleBlur("fatPer100g")}
                    placeholder={t("fatPlaceholder")}
                    keyboardType="numeric"
                    error={errors.fatPer100g}
                    touched={touched.fatPer100g}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("carbohydratesPer100g")} *</Text>
                  <FormField
                    value={values.carbohydratesPer100g.toString()}
                    onChangeText={(text) => {
                      const numValue = text === "" ? 0 : parseFloat(text);
                      if (!isNaN(numValue)) {
                        setFieldValue("carbohydratesPer100g", numValue);
                      }
                    }}
                    onBlur={handleBlur("carbohydratesPer100g")}
                    placeholder={t("carbohydratesPlaceholder")}
                    keyboardType="numeric"
                    error={errors.carbohydratesPer100g}
                    touched={touched.carbohydratesPer100g}
                  />
                </View>

                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>{t("optionalNutritions")}</Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("saturatedFatPer100g")}</Text>
                  <FormField
                    value={values.saturatedFatPer100g?.toString() || ""}
                    onChangeText={(text) => {
                      if (text === "" || text === "0") {
                        setFieldValue("saturatedFatPer100g", null);
                      } else {
                        const numValue = parseFloat(text);
                        if (!isNaN(numValue)) {
                          setFieldValue("saturatedFatPer100g", numValue);
                        }
                      }
                    }}
                    placeholder="0"
                    keyboardType="numeric"
                    error={errors.saturatedFatPer100g}
                    touched={touched.saturatedFatPer100g}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("sugarsPer100g")}</Text>
                  <FormField
                    value={values.sugarsPer100g?.toString() || ""}
                    onChangeText={(text) => {
                      if (text === "" || text === "0") {
                        setFieldValue("sugarsPer100g", null);
                      } else {
                        const numValue = parseFloat(text);
                        if (!isNaN(numValue)) {
                          setFieldValue("sugarsPer100g", numValue);
                        }
                      }
                    }}
                    placeholder="0"
                    keyboardType="numeric"
                    error={errors.sugarsPer100g}
                    touched={touched.sugarsPer100g}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("fiberPer100g")}</Text>
                  <FormField
                    value={values.fiberPer100g?.toString() || ""}
                    onChangeText={(text) => {
                      if (text === "" || text === "0") {
                        setFieldValue("fiberPer100g", null);
                      } else {
                        const numValue = parseFloat(text);
                        if (!isNaN(numValue)) {
                          setFieldValue("fiberPer100g", numValue);
                        }
                      }
                    }}
                    placeholder="0"
                    keyboardType="numeric"
                    error={errors.fiberPer100g}
                    touched={touched.fiberPer100g}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("saltPer100g")}</Text>
                  <FormField
                    value={values.saltPer100g?.toString() || ""}
                    onChangeText={(text) => {
                      if (text === "" || text === "0") {
                        setFieldValue("saltPer100g", null);
                      } else {
                        const numValue = parseFloat(text);
                        if (!isNaN(numValue)) {
                          setFieldValue("saltPer100g", numValue);
                        }
                      }
                    }}
                    placeholder="0"
                    keyboardType="numeric"
                    error={errors.saltPer100g}
                    touched={touched.saltPer100g}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>{t("sodiumPer100g")}</Text>
                  <FormField
                    value={values.sodiumPer100g?.toString() || ""}
                    onChangeText={(text) => {
                      if (text === "" || text === "0") {
                        setFieldValue("sodiumPer100g", null);
                      } else {
                        const numValue = parseFloat(text);
                        if (!isNaN(numValue)) {
                          setFieldValue("sodiumPer100g", numValue);
                        }
                      }
                    }}
                    placeholder="0"
                    keyboardType="numeric"
                    error={errors.sodiumPer100g}
                    touched={touched.sodiumPer100g}
                  />
                </View>

                <Text style={styles.requiredFieldsInfo}>* {t("requiredFieldsInfo")}</Text>

                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isFormButtonDisabled(values, errors, isLoading) && styles.submitButtonDisabled,
                  ]}
                  onPress={submitForm}
                  disabled={isFormButtonDisabled(values, errors, isLoading)}
                >
                  {isLoading ? (
                    <ActivityIndicator color={WHITE} />
                  ) : (
                    <Text style={styles.submitButtonText}>{t("addButton")}</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
