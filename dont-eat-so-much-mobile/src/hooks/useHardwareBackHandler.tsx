import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

export interface UseHardwareBackHandlerProps {
  handler: () => void;
}

export const useHardwareBackHandler = ({ handler }: UseHardwareBackHandlerProps) => {
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        handler();
        return true;
      });

      return () => backHandler.remove();
    }, [])
  );
};
