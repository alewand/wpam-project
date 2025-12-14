import { CommonActions, useNavigation } from "@react-navigation/native"
import { AppNavigation } from "../../../navigation/Navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { BarcodeScanningResult, PermissionResponse, useCameraPermissions } from "expo-camera";

export interface UseBarcodeScannerReturn {
    onBarcodeScanned: (scanResult: BarcodeScanningResult) => void;
    permission: PermissionResponse | null;
    requestPermission: () => Promise<PermissionResponse>;
    isTorchInUse: boolean;
    setIsTorchInUse: Dispatch<SetStateAction<boolean>>;
    handleGoBack: () => void;
}

export const useBarcodeScanner = (): UseBarcodeScannerReturn => {
    const navigation = useNavigation<AppNavigation>();
    const [permission, requestPermission] = useCameraPermissions();
    const [isTorchInUse, setIsTorchInUse] = useState<boolean>(false);

    const navigateToMeal = useCallback((barcode: string) => {
        navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
            {
                name: "BottomTabs",
                state: {
                routes: [
                    {
                    name: "Meal",
                    params: { barcode },
                    },
                ],
                },
            },
            ],
        })
        );
    }, [navigation]);

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onBarcodeScanned = useCallback((scanResult: BarcodeScanningResult) => {
        const scannedBarcode = scanResult.data?.trim();
        if (!scannedBarcode) return;

        navigateToMeal(scannedBarcode);
    }, [navigateToMeal])

    return { onBarcodeScanned, permission, requestPermission, isTorchInUse, setIsTorchInUse, handleGoBack };
}