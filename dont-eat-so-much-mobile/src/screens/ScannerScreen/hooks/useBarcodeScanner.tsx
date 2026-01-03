import { CommonActions, useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { BarcodeScanningResult, PermissionResponse, useCameraPermissions } from "expo-camera";
import { useGetMealByBarcode } from "../../../store/meal/api/useGetMealByBarcode";
import { Meal } from "../../../store/meal/types";
import { isBarcodeValid } from "../components/helpers";
import { BARCODE_TIMEOUT } from "../../../constants/constants";

export interface UseBarcodeScannerReturn {
  onBarcodeScanned: (scanResult: BarcodeScanningResult) => void;
  permission: PermissionResponse | null;
  requestPermission: () => Promise<PermissionResponse>;
  isTorchInUse: boolean;
  setIsTorchInUse: Dispatch<SetStateAction<boolean>>;
  handleGoBack: () => void;
  barcode?: string;
  isLoading?: boolean;
  isMealNotFoundModalVisible: boolean;
  handleCloseMealNotFoundModal: () => void;
  isManualBarcodeInputModalVisible: boolean;
  handleOpenManualBarcodeInputModal: () => void;
  handleCloseManualBarcodeInputModal: () => void;
  handleManualBarcodeInput: (barcode: string) => void;
}

export const useBarcodeScanner = (): UseBarcodeScannerReturn => {
  const navigation = useNavigation<AppNavigation>();
  const [permission, requestPermission] = useCameraPermissions();
  const { getMealByBarcode, isLoading } = useGetMealByBarcode();

  const [barcode, setBarcode] = useState<string | undefined>(undefined);
  const [lastScannedBarcode, setLastScannedBarcode] = useState<string | undefined>(undefined);

  const [isTorchInUse, setIsTorchInUse] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMealNotFoundModalVisible, setIsMealNotFoundModalVisible] = useState<boolean>(false);
  const [isManualBarcodeInputModalVisible, setIsManualBarcodeInputModalVisible] =
    useState<boolean>(false);

  const onBarcodeScanned = useCallback(
    (scanResult: BarcodeScanningResult) => {
      if (isLoading || isProcessing) return;

      const scannedBarcode = scanResult.data;

      if (
        !scannedBarcode ||
        !isBarcodeValid(scannedBarcode) ||
        scannedBarcode === lastScannedBarcode
      ) {
        return;
      }

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        setBarcode(scannedBarcode);
        setLastScannedBarcode(scannedBarcode);
      }, BARCODE_TIMEOUT);
    },
    [isLoading, isProcessing, lastScannedBarcode]
  );

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
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    navigation.goBack();
  }, [navigation]);

  const handleCloseMealNotFoundModal = useCallback(() => {
    setIsMealNotFoundModalVisible(false);
    setBarcode(undefined);
    setLastScannedBarcode(undefined);
  }, []);

  const handleCloseManualBarcodeInputModal = useCallback(() => {
    setIsManualBarcodeInputModalVisible(false);
    setBarcode(undefined);
    setLastScannedBarcode(undefined);
  }, []);

  const handleOpenManualBarcodeInputModal = useCallback(() => {
    setIsManualBarcodeInputModalVisible(true);
  }, []);

  const handleManualBarcodeInput = useCallback(
    (manualBarcode: string) => {
      if (isLoading || isProcessing) return;

      if (!isBarcodeValid(manualBarcode)) return;

      if (manualBarcode === lastScannedBarcode) return;

      setBarcode(manualBarcode);
      setLastScannedBarcode(manualBarcode);
    },
    [isLoading, isProcessing, lastScannedBarcode]
  );

  const fetchMealByBarcode = useCallback(
    async (barcode: string) => {
      setIsProcessing(true);
      try {
        const meal = await getMealByBarcode(barcode);

        if (meal) {
          navigateToConsumedMeal(meal);
        } else {
          setIsMealNotFoundModalVisible(true);
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [getMealByBarcode, navigateToConsumedMeal]
  );

  useEffect(() => {
    if (barcode) fetchMealByBarcode(barcode);
  }, [barcode, fetchMealByBarcode]);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  return {
    onBarcodeScanned,
    permission,
    requestPermission,
    isTorchInUse,
    setIsTorchInUse,
    handleGoBack,
    isMealNotFoundModalVisible,
    handleCloseMealNotFoundModal,
    isLoading: isLoading || isProcessing,
    barcode,
    isManualBarcodeInputModalVisible,
    handleCloseManualBarcodeInputModal,
    handleManualBarcodeInput,
    handleOpenManualBarcodeInputModal,
  };
};
