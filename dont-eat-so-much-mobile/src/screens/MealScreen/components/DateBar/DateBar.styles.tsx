import { StyleSheet } from "react-native";

import { BLACK, MAIN_COLOR, SECONDARY_COLOR, WHITE } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: WHITE,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        elevation: 8,
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
        paddingBottom: 8,
        paddingHorizontal: 4,
        paddingTop: 16,
        shadowColor: BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: "100%",
    },
    dateRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        justifyContent: "space-between",
        width: "100%",
    },
    dayCircle: {
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 24,
        flexDirection: "column",
        height: 40,
        justifyContent: "center",
        padding: 2,
        maxWidth: 40,
        flexShrink: 1,
        minWidth: 32,
    },
    dayCircleCurrent: {
        backgroundColor: SECONDARY_COLOR,
    },
    dayCircleSelected: {
        backgroundColor: MAIN_COLOR,
    },
    dayCirclesContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 8,
    },
    dayNameLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    dayNameLabelSelected: {
        color: WHITE,
    },
    dayNameNumberSelected: {
        color: WHITE,
    },
    dayNumberLabel: {
        fontSize: 12,
        fontWeight: "bold",
    },
    goBackIcon: {
        height: 12,
        resizeMode: "contain",
        width: 12,
    },
    weekInfoLabel: {
        fontSize: 10,
        fontWeight: "bold",
    },
    weekInfoRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 4,
        justifyContent: "center",
    }
});