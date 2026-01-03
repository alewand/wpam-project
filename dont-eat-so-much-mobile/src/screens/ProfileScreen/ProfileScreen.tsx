import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { styles } from "./ProfileScreen.styles";
import { useProfileScreen } from "./hooks/useProfileScreen";
import { Header } from "../../components/Header/Header";
import { WHITE } from "../../constants/colors";
import { useAppSelector } from "../../store/store";
import { selectName, selectEmail } from "../../store/auth/selectors";
import { UpdateNameModal } from "./components/UpdateNameModal";
import { UpdateEmailModal } from "./components/UpdateEmailModal";
import { UpdatePasswordModal } from "./components/UpdatePasswordModal";
import { DeleteAccountModal } from "./components/DeleteAccountModal";

const editIcon = require("../../assets/icons/editIcon.png");

export const ProfileScreen = () => {
  const { t, i18n: i18nInstance } = useTranslation("common", { keyPrefix: "profile" });
  const {
    isUpdatingName,
    isUpdatingEmail,
    isUpdatingPassword,
    isDeletingAccount,
    isLoggingOut,
    isLoggingOutFromAllDevices,
    isUpdateNameModalVisible,
    handleOpenUpdateNameModal,
    handleCloseUpdateNameModal,
    isUpdateEmailModalVisible,
    handleOpenUpdateEmailModal,
    handleCloseUpdateEmailModal,
    isUpdatePasswordModalVisible,
    handleOpenUpdatePasswordModal,
    handleCloseUpdatePasswordModal,
    isDeleteAccountModalVisible,
    handleOpenDeleteAccountModal,
    handleCloseDeleteAccountModal,
    handleUpdateName,
    handleUpdateEmail,
    handleUpdatePassword,
    handleDeleteAccount,
    handleLogout,
    handleLogoutFromAllDevices,
    dailyCaloriesLimit,
    dailyProteinLimit,
    dailyFatLimit,
    dailyCarbohydratesLimit,
    handleSetDailyCaloriesLimit,
    handleSetDailyProteinLimit,
    handleSetDailyFatLimit,
    handleSetDailyCarbohydratesLimit,
    handleSaveLimits,
    handleChangeLanguage,
  } = useProfileScreen();

  const name = useAppSelector(selectName);
  const email = useAppSelector(selectEmail);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("title")} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.userDataContainer}>
              <View style={styles.userDataRow}>
                <Text style={styles.userDataLabel}>{t("userData.name")}</Text>
                <View style={styles.editIconContainer}>
                  <Text style={styles.userDataValue}>{name || "-"}</Text>
                  <TouchableOpacity onPress={handleOpenUpdateNameModal}>
                    <Image source={editIcon} style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.userDataRow}>
                <Text style={styles.userDataLabel}>{t("userData.email")}</Text>
                <View style={styles.editIconContainer}>
                  <Text style={styles.userDataValue}>{email || "-"}</Text>
                  <TouchableOpacity onPress={handleOpenUpdateEmailModal}>
                    <Image source={editIcon} style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={handleOpenUpdatePasswordModal}>
              <Text style={styles.buttonText}>{t("updatePassword.title")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("limits.title")}</Text>
            <View style={styles.limitsContainer}>
              <View style={styles.limitFieldContainer}>
                <Text style={styles.limitFieldLabel}>{t("limits.calories")}</Text>
                <TextInput
                  style={styles.limitFieldInput}
                  value={dailyCaloriesLimit?.toString() || ""}
                  onChangeText={(text) => {
                    if (text === "") {
                      handleSetDailyCaloriesLimit(undefined);
                    } else {
                      const num = parseFloat(text);
                      if (!isNaN(num)) {
                        handleSetDailyCaloriesLimit(num);
                      }
                    }
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.limitFieldContainer}>
                <Text style={styles.limitFieldLabel}>{t("limits.protein")}</Text>
                <TextInput
                  style={styles.limitFieldInput}
                  value={dailyProteinLimit?.toString() || ""}
                  onChangeText={(text) => {
                    if (text === "") {
                      handleSetDailyProteinLimit(undefined);
                    } else {
                      const num = parseFloat(text);
                      if (!isNaN(num)) {
                        handleSetDailyProteinLimit(num);
                      }
                    }
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.limitFieldContainer}>
                <Text style={styles.limitFieldLabel}>{t("limits.fat")}</Text>
                <TextInput
                  style={styles.limitFieldInput}
                  value={dailyFatLimit?.toString() || ""}
                  onChangeText={(text) => {
                    if (text === "") {
                      handleSetDailyFatLimit(undefined);
                    } else {
                      const num = parseFloat(text);
                      if (!isNaN(num)) {
                        handleSetDailyFatLimit(num);
                      }
                    }
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.limitFieldContainer}>
                <Text style={styles.limitFieldLabel}>{t("limits.carbohydrates")}</Text>
                <TextInput
                  style={styles.limitFieldInput}
                  value={dailyCarbohydratesLimit?.toString() || ""}
                  onChangeText={(text) => {
                    if (text === "") {
                      handleSetDailyCarbohydratesLimit(undefined);
                    } else {
                      const num = parseFloat(text);
                      if (!isNaN(num)) {
                        handleSetDailyCarbohydratesLimit(num);
                      }
                    }
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.saveLimitsButton]}
              onPress={handleSaveLimits}
            >
              <Text style={styles.buttonText}>{t("limits.saveButton")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("language.title")}</Text>
            <View style={styles.languageContainer}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  i18nInstance.language === "pl" && styles.languageButtonActive,
                ]}
                onPress={() => handleChangeLanguage("pl")}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    i18nInstance.language === "pl" && styles.languageButtonTextActive,
                  ]}
                >
                  {t("language.polish")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  i18nInstance.language === "en" && styles.languageButtonActive,
                ]}
                onPress={() => handleChangeLanguage("en")}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    i18nInstance.language === "en" && styles.languageButtonTextActive,
                  ]}
                >
                  {t("language.english")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? (
                <ActivityIndicator color={WHITE} />
              ) : (
                <Text style={styles.buttonText}>{t("logout")}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogoutFromAllDevices}
              disabled={isLoggingOutFromAllDevices}
            >
              {isLoggingOutFromAllDevices ? (
                <ActivityIndicator color={WHITE} />
              ) : (
                <Text style={styles.buttonText}>{t("logoutFromAllDevices")}</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger]}
              onPress={handleOpenDeleteAccountModal}
            >
              <Text style={styles.buttonText}>{t("deleteAccount.deleteButton")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isUpdateNameModalVisible && (
        <UpdateNameModal
          isVisible={isUpdateNameModalVisible}
          onClose={handleCloseUpdateNameModal}
          onConfirm={handleUpdateName}
          initialName={name || ""}
          isLoading={isUpdatingName}
        />
      )}

      {isUpdateEmailModalVisible && (
        <UpdateEmailModal
          isVisible={isUpdateEmailModalVisible}
          onClose={handleCloseUpdateEmailModal}
          onConfirm={handleUpdateEmail}
          isLoading={isUpdatingEmail}
        />
      )}

      {isUpdatePasswordModalVisible && (
        <UpdatePasswordModal
          isVisible={isUpdatePasswordModalVisible}
          onClose={handleCloseUpdatePasswordModal}
          onConfirm={handleUpdatePassword}
          isLoading={isUpdatingPassword}
        />
      )}

      {isDeleteAccountModalVisible && (
        <DeleteAccountModal
          isVisible={isDeleteAccountModalVisible}
          onClose={handleCloseDeleteAccountModal}
          onConfirm={handleDeleteAccount}
          isLoading={isDeletingAccount}
        />
      )}
    </SafeAreaView>
  );
};
