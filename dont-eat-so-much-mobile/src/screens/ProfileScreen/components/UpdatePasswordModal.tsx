import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./UpdatePasswordModal.styles";
import { FormField } from "../../../components/FormField/FormField";
import { WHITE } from "../../../constants/colors";
import { getUpdatePasswordButtonColor, isUpdatePasswordButtonDisabled } from "./helpers";

interface UpdatePasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (newPassword: string, password: string) => void;
  isLoading: boolean;
}

export const UpdatePasswordModal = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading,
}: UpdatePasswordModalProps) => {
  const { t } = useTranslation("common", { keyPrefix: "profile.updatePassword" });
  const { t: tCommon } = useTranslation("common", { keyPrefix: "profile" });

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("password.required")
      .min(10, "password.tooShort")
      .max(50, "password.tooLong"),
    password: Yup.string().required("password.required"),
  });

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{t("title")}</Text>
          <Formik
            initialValues={{ newPassword: "", password: "" }}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => onConfirm(values.newPassword, values.password)}
          >
            {({
              handleSubmit,
              values,
              setFieldValue,
              setFieldTouched,
              errors,
              touched,
              handleBlur,
            }) => (
              <>
                <FormField
                  value={values.newPassword}
                  onChangeText={(text) => {
                    setFieldValue("newPassword", text);
                    if (touched.newPassword) {
                      setFieldTouched("newPassword", true, false);
                    }
                  }}
                  onBlur={handleBlur("newPassword")}
                  placeholder={t("newPassword")}
                  isPassword
                  error={errors.newPassword}
                  touched={touched.newPassword}
                />
                <FormField
                  value={values.password}
                  onChangeText={(text) => {
                    setFieldValue("password", text);
                    if (touched.password) {
                      setFieldTouched("password", true, false);
                    }
                  }}
                  onBlur={handleBlur("password")}
                  placeholder={t("password")}
                  isPassword
                  error={errors.password}
                  touched={touched.password}
                />
                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                    <Text style={styles.cancelButtonText}>{tCommon("cancel")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      {
                        backgroundColor: getUpdatePasswordButtonColor(isLoading, values, errors),
                      },
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={isUpdatePasswordButtonDisabled(isLoading, values, errors)}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={WHITE} />
                    ) : (
                      <Text style={styles.confirmButtonText}>{t("saveButton")}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
