import { createContext, useContext, useState } from "react";
import { Snackbar, Portal } from "react-native-paper";
import { Text } from "react-native";
import { styles } from "./Snackbar.styles";

type SnackbarContextType = {
  publish: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within a SnackbarProvider");
  return context;
};

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarKey, setSnackbarKey] = useState(0);

  const publish = (message: string) => {
    setMessage(message);
    setSnackbarKey((prev) => prev + 1);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ publish }}>
      {children}
      <Portal>
        <Snackbar
          key={snackbarKey}
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
          style={styles.snackbar}
          wrapperStyle={{ zIndex: 10000, elevation: 10000 }}
        >
          <Text style={styles.message}>{message}</Text>
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
};
