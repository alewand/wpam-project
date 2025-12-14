import { DateTime } from "luxon"
import { useCallback, useEffect, useMemo } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-gesture-handler"

import { getCurrentDay } from "../../../../store/date/helpers"
import { selectCurrentDay, selectMonthOfSelectedWeek, selectSelectedDay, selectSelectedWeek, selectYearOfSelectedWeek } from "../../../../store/date/selectors"
import { setNextWeek, setPreviousWeek, setSelectedDay } from "../../../../store/date/slice"
import { Day } from "../../../../store/date/types"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { styles } from "./DateBar.styles"

const goLeftIcon = require("../../../../assets/icons/goLeft.png");
const goRightIcon = require("../../../../assets/icons/goRight.png");
const goBackIcon = require("../../../../assets/icons/goBackToSelectedDay.png");
const goBackDisabledIcon = require("../../../../assets/icons/goBackToSelectedDayDisabled.png");

export const DateBar = () => {
    const dispatch = useAppDispatch();

    const currentDay = useAppSelector(selectCurrentDay);
    const selectedDay = useAppSelector(selectSelectedDay);
    const selectedWeek: Day[] = useAppSelector(selectSelectedWeek);
    const selectedMonth = useAppSelector(selectMonthOfSelectedWeek);
    const selectedYear = useAppSelector(selectYearOfSelectedWeek);

    const getDayStyle = useCallback((date: DateTime) => {
        const basicStyle = [styles.dayCircle];
        if (date.hasSame(selectedDay, "day")) return [...basicStyle, styles.dayCircleSelected];
        if (date.hasSame(currentDay, "day")) return [...basicStyle, styles.dayCircleCurrent];
        return basicStyle;
    }, [selectedDay, currentDay]);

    const getDayLabelStyle = useCallback((date: DateTime) => {
        const basicStyle = { name: [styles.dayNameLabel], number: [styles.dayNumberLabel]} ;
        if (date.hasSame(selectedDay, "day") || date.hasSame(currentDay, "day")) {
            return { name: [...basicStyle.name, styles.dayNameLabelSelected], number: [...basicStyle.number, styles.dayNameNumberSelected]  };
        };
        return basicStyle;
    }, [selectedDay, currentDay]);

    const handlePreviousWeek = useCallback(() => {
        dispatch(setPreviousWeek());
    }, [dispatch]);

    const handleNextWeek = useCallback(() => {
        dispatch(setNextWeek());
    }, [dispatch]);

    const handleDayPress = useCallback((date: DateTime) => {
        dispatch(setSelectedDay(date.toISO() ?? getCurrentDay()));
    }, [dispatch]);

    const handleGoBackToSelectedDay = useCallback(() => {
        dispatch(setSelectedDay(getCurrentDay()));
    }, [dispatch]);

    const isGoBackDisabled = useMemo(() => {
        return selectedWeek.some(day => day.date.hasSame(currentDay, "day"));
    }, [currentDay, selectedWeek]);

    useEffect(() => {
        handleGoBackToSelectedDay();
    }, [handleGoBackToSelectedDay]);

    return (
        <View style={styles.container}>
            <View style={styles.dateRow}>
                <TouchableOpacity onPress={handlePreviousWeek}>
                    <Image source={goLeftIcon} />
                </TouchableOpacity>
                <View style={styles.dayCirclesContainer}>
                {
                    selectedWeek.map((day) => (
                        <TouchableOpacity 
                            key={day.name}
                            style={getDayStyle(day.date)}
                            onPress={() => handleDayPress(day.date)}
                            disabled={day.date.hasSame(selectedDay, "day")}
                        >
                            <Text style={getDayLabelStyle(day.date).name}>{day.name.slice(0, 1)}</Text>
                            <Text style={getDayLabelStyle(day.date).number}>{day.date.toFormat("dd")}</Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
                <TouchableOpacity onPress={handleNextWeek}>
                    <Image source={goRightIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.weekInfoRow}>
                <Text style={styles.weekInfoLabel}>{selectedMonth}</Text>
                <Text style={styles.weekInfoLabel}>{selectedYear}</Text>
                <TouchableOpacity onPress={handleGoBackToSelectedDay} disabled={isGoBackDisabled}>
                    <Image style={styles.goBackIcon} source={isGoBackDisabled ? goBackDisabledIcon : goBackIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}; 