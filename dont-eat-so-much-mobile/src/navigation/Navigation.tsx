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
import { ProfileScreen } from "../screens/ProfileScreen/ProfileScreen";
import { Meal } from "../store/meal/types";
import { useTranslation } from "react-i18next";
import { Image, View, Text } from "react-native";
import { styles } from "./Navigation.styles";

export type BottomTabParamList = {
  Meal: {
    resetDate?: boolean;
  };
  Profile: undefined;
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

const mealsIcon = require("../assets/icons/mealIcon.png");
const profileIcon = require("../assets/icons/profileIcon.png");

const BottomTabNavigator = () => {
  const { t } = useTranslation("common");

  return (
    <BottomTab.Navigator
      initialRouteName="Meal"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: MAIN_COLOR,
          height: 60,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: BACKGROUND_COLOR,
        tabBarItemStyle: {
          paddingBottom: 4,
        },
      }}
    >
      <BottomTab.Screen
        name="Meal"
        component={MealScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.tabBarLabelContainer}>
              <Text
                style={[
                  styles.tabBarLabelText,
                  focused ? styles.tabBarLabelTextActive : styles.tabBarLabelTextInactive,
                ]}
              >
                {t("bottomTabs.meals")}
              </Text>
              {focused && <View style={styles.tabBarLabelUnderline} />}
            </View>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabBarIconContainer}>
              <Image source={mealsIcon} style={[styles.tabBarIcon, { tintColor: color }]} />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.tabBarLabelContainer}>
              <Text
                style={[
                  styles.tabBarLabelText,
                  focused ? styles.tabBarLabelTextActive : styles.tabBarLabelTextInactive,
                ]}
              >
                {t("bottomTabs.profile")}
              </Text>
              {focused && <View style={styles.tabBarLabelUnderline} />}
            </View>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabBarIconContainer}>
              <Image source={profileIcon} style={[styles.tabBarIcon, { tintColor: color }]} />
            </View>
          ),
        }}
      />
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
