import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./UpdateEmailModal.styles";
import { FormField } from "../../../components/FormField/FormField";
import { WHITE } from "../../../constants/colors";
import { getUpdateEmailButtonColor, isUpdateEmailButtonDisabled } from "./helpers";

interface UpdateEmailModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (email: string, password: string) => void;
  isLoading: boolean;
}

export const UpdateEmailModal = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading,
}: UpdateEmailModalProps) => {
  const { t } = useTranslation("common", { keyPrefix: "profile.updateEmail" });
  const { t: tCommon } = useTranslation("common", { keyPrefix: "profile" });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(1, "email.tooShort")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email.invalidFormat")
      .max(50, "email.tooLong")
      .required("email.required"),
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
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => onConfirm(values.email, values.password)}
          >
            {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => (
              <>
                <FormField
                  value={values.email}
                  onChangeText={(text) => setFieldValue("email", text)}
                  onBlur={handleBlur("email")}
                  placeholder={t("email")}
                  keyboardType="email-address"
                  error={errors.email}
                  touched={touched.email}
                />
                <FormField
                  value={values.password}
                  onChangeText={(text) => setFieldValue("password", text)}
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
                        backgroundColor: getUpdateEmailButtonColor(isLoading, values, errors),
                      },
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={isUpdateEmailButtonDisabled(isLoading, values, errors)}
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
