import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { WelcomeScreen } from "../screens/WelcomeScreen/WelcomeScreen";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BACKGROUND_COLOR, MAIN_COLOR, WHITE } from "../constants/colors";
import { MealScreen } from "../screens/MealScreen/MealScreen";
import { useAppSelector } from "../store/store";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { ScannerScreen } from "../screens/ScannerScreen/ScannerScreen";
import { ConsumedMealScreen } from "../screens/ConsumedMealScreen/ConsumedMealScreen";
import { SearchMealScreen } from "../screens/SearchMealScreen/SearchMealScreen";
import { AddMealScreen } from "../screens/AddMealScreen/AddMealScreen";
import { Meal } from "../store/meal/types";

export type BottomTabParamList = {
  Meal: {
    resetDate?: boolean;
  };
};

export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  Scanner: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  SearchMeal: undefined;
  AddMeal: undefined;
  ConsumedMeal: {
    meal: Meal;
    action: "add" | "edit" | "view";
    consumedMealId?: string;
    amountInGrams?: number;
    source?: "SearchMeal" | "Meal" | "Scanner" | "AddMeal";
  };
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Meal"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: MAIN_COLOR,
          height: 60,
        },
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: BACKGROUND_COLOR,
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <BottomTab.Screen name="Meal" component={MealScreen} />
    </BottomTab.Navigator>
  );
};

export const Navigation = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "BottomTabs" : "Welcome"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen name="SearchMeal" component={SearchMealScreen} />
        <Stack.Screen name="AddMeal" component={AddMealScreen} />
        <Stack.Screen name="ConsumedMeal" component={ConsumedMealScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
