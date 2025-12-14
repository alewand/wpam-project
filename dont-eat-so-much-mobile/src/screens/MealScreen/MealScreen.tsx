import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

import { DateBar } from "./components/DateBar/DateBar";
import { styles } from "./MealScreen.styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigation, BottomTabParamList } from "../../navigation/Navigation";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { clearUserCredentials } from "../../store/auth/slice";


const addProductIcon = require("../../assets/icons/addProduct.png");
const barCodeIcon = require("../../assets/icons/barCode.png");

export const MealScreen = () => {
    const navigation = useNavigation<AppNavigation>();
    const route = useRoute<RouteProp<BottomTabParamList, 'Meal'>>();

    const barcode = route.params?.barcode;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (barcode) {
            // Fetch product details using the barcode
            console.log("Scanned barcode:", barcode);
        }
    }, [barcode]);

    const handleBarcodePress = useCallback(() => {
        navigation.navigate("Scanner");
    }, [navigation]);

    return (
        <SafeAreaView>
            <DateBar />
            <ScrollView>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.button} onPress={handleBarcodePress}>
                        <Image style={styles.buttonIcon} source={barCodeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image style={styles.buttonIcon} source={addProductIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => dispatch(clearUserCredentials())}>
                    <Text>ClearCredentials</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};