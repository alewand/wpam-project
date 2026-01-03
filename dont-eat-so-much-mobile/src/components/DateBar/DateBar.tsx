import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { memo, useMemo } from "react";
import { styles } from "./DateBar.styles";
import { useDateBar } from "./hooks/useDateBar";

export interface DateBarProps {
  resetDate?: boolean;
}

const goLeftIcon = require("../../assets/icons/goLeft.png");
const goRightIcon = require("../../assets/icons/goRight.png");
const goBackIcon = require("../../assets/icons/goBackToSelectedDay.png");
const goBackDisabledIcon = require("../../assets/icons/goBackToSelectedDayDisabled.png");

const DateBarComponent = ({ resetDate }: DateBarProps) => {
  const {
    selectedDay,
    selectedWeek,
    selectedMonth,
    selectedYear,
    getDayStyle,
    getDayLabelStyle,
    handlePreviousWeek,
    handleNextWeek,
    handleDayPress,
    handleGoBackToSelectedDay,
    isGoBackDisabled,
  } = useDateBar({ resetDate });

  const dayCircles = useMemo(
    () =>
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
      )),
    [selectedWeek, selectedDay, getDayStyle, getDayLabelStyle, handleDayPress]
  );

  return (
    <View style={styles.container}>
      <View style={styles.dateRow}>
        <TouchableOpacity onPress={handlePreviousWeek}>
          <Image source={goLeftIcon} />
        </TouchableOpacity>
        <View style={styles.dayCirclesContainer}>{dayCircles}</View>
        <TouchableOpacity onPress={handleNextWeek}>
          <Image source={goRightIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleGoBackToSelectedDay}
        disabled={isGoBackDisabled}
        style={styles.weekInfoRow}
      >
        <Text style={styles.weekInfoLabel}>{selectedMonth}</Text>
        <Text style={styles.weekInfoLabel}>{selectedYear}</Text>
        <Image
          style={styles.goBackIcon}
          source={isGoBackDisabled ? goBackDisabledIcon : goBackIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export const DateBar = memo(DateBarComponent);
