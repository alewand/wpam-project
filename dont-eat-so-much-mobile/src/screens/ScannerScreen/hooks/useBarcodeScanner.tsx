import { CommonActions, useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { BarcodeScanningResult, PermissionResponse, useCameraPermissions } from "expo-camera";
import { useGetMealByBarcode } from "../../../store/meal/api/useGetMealByBarcode";
import { Meal } from "../../../store/meal/types";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useTranslation } from "react-i18next";
import { isValidBarcodeLength } from "../../../constants/constants";

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
  isManualBarcodeInputModalVisible: boolean;
  setIsManualBarcodeInputModalVisible: Dispatch<SetStateAction<boolean>>;
  handleManualBarcodeInput: (barcode: string) => void;
}

export const useBarcodeScanner = (): UseBarcodeScannerReturn => {
  const navigation = useNavigation<AppNavigation>();
  const [permission, requestPermission] = useCameraPermissions();
  const { getMealByBarcode, isLoading } = useGetMealByBarcode();
  const { publish } = useSnackbar();
  const { t } = useTranslation("errors");

  const [isTorchInUse, setIsTorchInUse] = useState<boolean>(false);
  const [isMealNotFoundModalVisible, setIsMealNotFoundModalVisible] = useState<boolean>(false);
  const [isManualBarcodeInputModalVisible, setIsManualBarcodeInputModalVisible] =
    useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastScannedBarcode, setLastScannedBarcode] = useState<string | null>(null);
  const [barcode, setBarcode] = useState<string | null>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onBarcodeScanned = useCallback(
    (scanResult: BarcodeScanningResult) => {
      if (isLoading || isProcessing) return;

      const scannedBarcode = scanResult.data?.trim();

      if (!scannedBarcode || !isValidBarcodeLength(scannedBarcode.length)) {
        return;
      }

      if (scannedBarcode === lastScannedBarcode) return;

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setBarcode(scannedBarcode);
        setLastScannedBarcode(scannedBarcode);
      }, 300);
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
    setBarcode(null);
    setLastScannedBarcode(null);
  }, []);

  const handleManualBarcodeInput = useCallback(
    (manualBarcode: string) => {
      if (isLoading || isProcessing) return;

      const trimmedBarcode = manualBarcode.trim();
      if (!isValidBarcodeLength(trimmedBarcode.length)) {
        return;
      }

      if (trimmedBarcode === lastScannedBarcode) return;

      setBarcode(trimmedBarcode);
      setLastScannedBarcode(trimmedBarcode);
    },
    [isLoading, isProcessing, lastScannedBarcode]
  );

  const fetchMealByBarcode = useCallback(
    async (barcode: string) => {
      setIsProcessing(true);
      try {
        const { meal, error } = await getMealByBarcode(barcode);

        if (meal) {
          navigateToConsumedMeal(meal);
        } else if (error === "not-found") {
          setIsMealNotFoundModalVisible(true);
        } else if (error === "network-error") {
          publish(t("networkError"));
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [getMealByBarcode, navigateToConsumedMeal, publish, t]
  );

  useEffect(() => {
    if (barcode) {
      fetchMealByBarcode(barcode);
    }
  }, [barcode, fetchMealByBarcode]);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
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
    setIsManualBarcodeInputModalVisible,
    handleManualBarcodeInput,
  };
};
