import { SafeAreaView } from "react-native-safe-area-context";
import { GramsInput } from "./components/GramsInput";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../components/Header/Header";
import { styles } from "./ConsumedMealScreen.styles";
import { useConsumedMealScreen } from "./hooks/useConsumedMealScreen";
import { NutritionsView } from "./components/NutritionsView";
import { ActivityIndicator } from "react-native-paper";
import { WHITE } from "../../constants/colors";
import { DateBar } from "../../components/DateBar/DateBar";
import { useHardwareBackHandler } from "../../hooks/useHardwareBackHandler";

export const ConsumedMealScreen = () => {
  const {
    grams,
    setGrams,
    headerTitle,
    mealName,
    mealBrand,
    mealImageUrl,
    nutritions,
    confirmButtonName,
    isConfirmButtonDisabled,
    isLoading,
    action,
    actionType,
    goBack,
  } = useConsumedMealScreen();

  useHardwareBackHandler({ handler: goBack });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        >
          <View style={styles.headerContainer}>
            <Header title={headerTitle} />
            {actionType !== "view" && <DateBar />}
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.mealInfoCard}>
              {mealImageUrl && <Image source={{ uri: mealImageUrl }} style={styles.mealImage} />}
              <Text style={styles.mealName}>{mealName}</Text>
              {mealBrand && <Text style={styles.mealBrand}>{mealBrand}</Text>}
            </View>
            <GramsInput grams={grams} setGrams={setGrams} readOnly={actionType === "view"} />
            <NutritionsView nutritions={nutritions} />
            {actionType !== "view" && (
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  isConfirmButtonDisabled && styles.confirmButtonDisabled,
                ]}
                onPress={action}
                disabled={isConfirmButtonDisabled}
              >
                {isLoading ? (
                  <ActivityIndicator color={WHITE} />
                ) : (
                  <Text style={styles.confirmButtonText}>{confirmButtonName}</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
