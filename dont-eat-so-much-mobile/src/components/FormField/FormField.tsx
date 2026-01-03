import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { getStyles } from "./FormField.styles";
import { useSnackbar } from "../Snackbar/Snackbar";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export interface FormFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  placeholder?: string;
  iconSource?: any;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

const alertIcon = require("../../assets/icons/alert.png");
const eyeOpenedIcon = require("../../assets/icons/eyeOpen.png");
const eyeClosedIcon = require("../../assets/icons/eyeClosed.png");

export const FormField = ({
  value,
  onChangeText,
  onBlur,
  placeholder,
  iconSource,
  error,
  touched,
  isPassword,
  keyboardType = "default",
}: FormFieldProps) => {
  const styles = useMemo(() => getStyles(!!error && !!touched), [error, touched]);
  const { t } = useTranslation("errors", { keyPrefix: "validation" });
  const { publish } = useSnackbar();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onEyeClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handleErrorPress = useCallback(() => {
    if (error) publish(t(error));
  }, [error, publish, t]);

  return (
    <View style={styles.container}>
      {iconSource && <Image source={iconSource} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={isPassword && !isPasswordVisible}
        keyboardType={keyboardType}
      />
      {isPassword && (
        <TouchableOpacity style={styles.icon} onPress={onEyeClick}>
          <Image source={isPasswordVisible ? eyeClosedIcon : eyeOpenedIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
      {error && touched && (
        <TouchableOpacity onPress={handleErrorPress}>
          <Image source={alertIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};
