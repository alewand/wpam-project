import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, MAIN_COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
    snackbar: {
        flexDirection: "row",
        backgroundColor: MAIN_COLOR,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    message: {
        color: BACKGROUND_COLOR,
        fontSize: 16,
    }
});