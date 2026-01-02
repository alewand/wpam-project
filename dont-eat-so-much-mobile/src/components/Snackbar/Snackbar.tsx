import { createContext, useContext, useState } from "react";
import { Snackbar } from "react-native-paper";
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

  const publish = (message: string) => {
    setMessage(message);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ publish }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        <Text style={styles.message}>{message}</Text>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
