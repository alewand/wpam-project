import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./src/navigation/Navigation";
import "./src/utils/i18n";
import { SnackbarProvider } from "./src/components/Snackbar/Snackbar";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <Navigation />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
