import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./UpdateNameModal.styles";
import { FormField } from "../../../components/FormField/FormField";
import { WHITE } from "../../../constants/colors";

interface UpdateNameModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  initialName: string;
  isLoading: boolean;
}

export const UpdateNameModal = ({
  isVisible,
  onClose,
  onConfirm,
  initialName,
  isLoading,
}: UpdateNameModalProps) => {
  const { t } = useTranslation("common", { keyPrefix: "profile.updateName" });
  const { t: tCommon } = useTranslation("common", { keyPrefix: "profile" });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name.required").min(3, "name.tooShort").max(20, "name.tooLong"),
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
            initialValues={{ name: initialName }}
            validationSchema={validationSchema}
            onSubmit={(values) => onConfirm(values.name)}
          >
            {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => (
              <>
                <FormField
                  value={values.name}
                  onChangeText={(text) => setFieldValue("name", text)}
                  onBlur={handleBlur("name")}
                  placeholder={t("namePlaceholder")}
                  error={errors.name}
                  touched={touched.name}
                />
                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                    <Text style={styles.cancelButtonText}>{tCommon("cancel")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleSubmit}
                    disabled={isLoading}
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

