import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./DeleteAccountModal.styles";
import { FormField } from "../../../components/FormField/FormField";
import { WHITE } from "../../../constants/colors";

interface DeleteAccountModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isLoading: boolean;
}

export const DeleteAccountModal = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading,
}: DeleteAccountModalProps) => {
  const { t } = useTranslation("common", { keyPrefix: "profile.deleteAccount" });
  const { t: tCommon } = useTranslation("common", { keyPrefix: "profile" });

  const validationSchema = Yup.object().shape({
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
          <Text style={styles.warning}>{t("confirmMessage")}</Text>
          <Formik
            initialValues={{ password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => onConfirm(values.password)}
          >
            {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => (
              <>
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
                    style={styles.confirmButton}
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={WHITE} />
                    ) : (
                      <Text style={styles.confirmButtonText}>{t("deleteButton")}</Text>
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
