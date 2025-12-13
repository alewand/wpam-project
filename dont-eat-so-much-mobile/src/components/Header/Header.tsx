import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "./Header.styles";
import { AppNavigation } from "../../navigation/Navigation";

export interface HeaderProps {
  onGoBack?: () => void;
}

const goBackIcon = require("../../assets/icons/goBack.png");

export const Header = ({ onGoBack }: HeaderProps) => {
  const navigation = useNavigation<AppNavigation>();
  
  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackCircle} onPress={() => {
          if (onGoBack) {
            onGoBack();
          } else {
            navigation.goBack();
          }
        }}>
          <Image source={goBackIcon} style={styles.goBackIcon}/>
        </TouchableOpacity>
      </View>
  );
};