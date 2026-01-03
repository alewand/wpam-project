import { Image, Text, TouchableOpacity, View } from "react-native";
import { Meal } from "../../store/meal/types";
import { styles } from "./SmallMealCard.styles";

const placeholderIcon = require("../../assets/icons/placeholder.png");

export interface SmallMealCardProps {
  meal: Meal;
  onPress: (meal: Meal) => void;
}

export const SmallMealCard = ({ meal, onPress }: SmallMealCardProps) => {
  const { name, brand, imageUrl } = meal;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(meal)}>
      <View style={styles.left}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Image source={placeholderIcon} style={styles.placeholderIcon} />
          </View>
        )}
      </View>
      <View style={styles.right}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {brand && (
          <Text style={styles.brand} numberOfLines={1} ellipsizeMode="tail">
            {brand}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
