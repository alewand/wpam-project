import { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export interface UseHardwareBackHandlerProps {
  handler: () => void;
}

export const useHardwareBackHandler = ({ handler }: UseHardwareBackHandlerProps) => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        handler();
      });

      return unsubscribe;
    }, [navigation, handler])
  );
};
