import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./Header.styles";
import { AppNavigation } from "../../navigation/Navigation";

export interface HeaderProps {
  onGoBack?: () => void;
  title?: string;
}

const goBackIcon = require("../../assets/icons/goBack.png");

export const Header = ({ onGoBack, title }: HeaderProps) => {
  const navigation = useNavigation<AppNavigation>();

  const handleGoBack = () => {
    if (onGoBack) onGoBack();
    else navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.goBackCircle} onPress={handleGoBack}>
          <Image source={goBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
