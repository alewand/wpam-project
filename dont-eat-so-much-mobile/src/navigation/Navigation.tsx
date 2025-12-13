import { createNativeStackNavigator, type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WelcomeScreen } from "../screens/WelcomeScreen/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen/RegisterScreen";

export type RootStackParamList = {
    Welcome: undefined;
    Register: undefined;
    Login: undefined;
}

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};