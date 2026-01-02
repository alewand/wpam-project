import { CommonActions, useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { BarcodeScanningResult, PermissionResponse, useCameraPermissions } from "expo-camera";
import { useGetMealByBarcode } from "../../../store/meal/api/useGetMealByBarcode";
import { Meal } from "../../../store/meal/types";

export interface UseBarcodeScannerReturn {
  onBarcodeScanned: (scanResult: BarcodeScanningResult) => void;
  permission: PermissionResponse | null;
  requestPermission: () => Promise<PermissionResponse>;
  isTorchInUse: boolean;
  setIsTorchInUse: Dispatch<SetStateAction<boolean>>;
  handleGoBack: () => void;
  barcode?: string | null;
  isLoading?: boolean;
  isMealNotFoundModalVisible: boolean;
  handleCloseMealNotFoundModal: () => void;
}

export const useBarcodeScanner = (): UseBarcodeScannerReturn => {
  const navigation = useNavigation<AppNavigation>();
  const [permission, requestPermission] = useCameraPermissions();
  const { getMealByBarcode, isLoading } = useGetMealByBarcode();

  const [isTorchInUse, setIsTorchInUse] = useState<boolean>(false);
  const [isMealNotFoundModalVisible, setIsMealNotFoundModalVisible] = useState<boolean>(false);

  const [barcode, setBarcode] = useState<string | null>(null);
  const scannerRefresher = useRef<number>(0);

  const onBarcodeScanned = useCallback((scanResult: BarcodeScanningResult) => {
    const scannedBarcode = scanResult.data?.trim();
    if (!scannedBarcode) return;

    setBarcode(scannedBarcode);
    scannerRefresher.current = (scannerRefresher.current + 1) % 2;
  }, []);

  const navigateToConsumedMeal = useCallback(
    (meal: Meal) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "BottomTabs",
              state: {
                index: 0,
                routes: [
                  {
                    name: "Meal",
                    params: {
                      barcode: meal.barcode,
                    },
                  },
                ],
              },
            },
            {
              name: "ConsumedMeal",
              params: { meal, action: "add" },
            },
          ],
        })
      );
    },
    [navigation]
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCloseMealNotFoundModal = useCallback(() => setIsMealNotFoundModalVisible(false), []);

  const fetchMealByBarcode = useCallback(
    async (barcode: string) => {
      const meal = await getMealByBarcode(barcode);

      if (meal) {
        navigateToConsumedMeal(meal);
      } else {
        setIsMealNotFoundModalVisible(true);
      }
    },
    [getMealByBarcode, navigateToConsumedMeal]
  );

  useEffect(() => {
    if (barcode) fetchMealByBarcode(barcode);
  }, [barcode, fetchMealByBarcode, scannerRefresher.current]);

  return {
    onBarcodeScanned,
    permission,
    requestPermission,
    isTorchInUse,
    setIsTorchInUse,
    handleGoBack,
    isMealNotFoundModalVisible,
    handleCloseMealNotFoundModal,
    isLoading,
    barcode,
  };
};
