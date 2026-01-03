import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../../navigation/Navigation";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { selectIsAuthenticated } from "../../../store/auth/selectors";
import { useGetUserProfileQuery } from "../../../store/user/api";
import { useUpdateName } from "../../../store/user/api/useUpdateName";
import { useUpdateEmail } from "../../../store/user/api/useUpdateEmail";
import { useUpdatePassword } from "../../../store/user/api/useUpdatePassword";
import { useDeleteAccount } from "../../../store/user/api/useDeleteAccount";
import { useLogout } from "../../../store/auth/api/useLogout";
import { useLogoutFromAllDevices } from "../../../store/auth/api/useLogoutFromAllDevices";
import { useSnackbar } from "../../../components/Snackbar/Snackbar";
import { useTranslation } from "react-i18next";
import i18n from "../../../utils/i18n";
import {
  setDailyCaloriesLimit,
  setDailyProteinLimit,
  setDailyFatLimit,
  setDailyCarbohydratesLimit,
} from "../../../store/user/slice";
import {
  selectDailyCaloriesLimit,
  selectDailyProteinLimit,
  selectDailyFatLimit,
  selectDailyCarbohydratesLimit,
} from "../../../store/user/selectors";

export const useProfileScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { publish } = useSnackbar();
  const { t } = useTranslation("common", { keyPrefix: "profile.limits" });
  const { t: tProfile } = useTranslation("common", { keyPrefix: "profile" });
  const { data: userProfile } = useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { updateName, isLoading: isUpdatingName } = useUpdateName();
  const { updateEmail, isLoading: isUpdatingEmail } = useUpdateEmail();
  const { updatePassword, isLoading: isUpdatingPassword } = useUpdatePassword();
  const { deleteAccount, isLoading: isDeletingAccount } = useDeleteAccount();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { logoutFromAllDevices, isLoading: isLoggingOutFromAllDevices } = useLogoutFromAllDevices();

  const dailyCaloriesLimit = useAppSelector(selectDailyCaloriesLimit);
  const dailyProteinLimit = useAppSelector(selectDailyProteinLimit);
  const dailyFatLimit = useAppSelector(selectDailyFatLimit);
  const dailyCarbohydratesLimit = useAppSelector(selectDailyCarbohydratesLimit);

  const [isUpdateNameModalVisible, setIsUpdateNameModalVisible] = useState(false);
  const [isUpdateEmailModalVisible, setIsUpdateEmailModalVisible] = useState(false);
  const [isUpdatePasswordModalVisible, setIsUpdatePasswordModalVisible] = useState(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] = useState(false);

  const handleOpenUpdateNameModal = useCallback(() => {
    setIsUpdateNameModalVisible(true);
  }, []);

  const handleCloseUpdateNameModal = useCallback(() => {
    setIsUpdateNameModalVisible(false);
  }, []);

  const handleOpenUpdateEmailModal = useCallback(() => {
    setIsUpdateEmailModalVisible(true);
  }, []);

  const handleCloseUpdateEmailModal = useCallback(() => {
    setIsUpdateEmailModalVisible(false);
  }, []);

  const handleOpenUpdatePasswordModal = useCallback(() => {
    setIsUpdatePasswordModalVisible(true);
  }, []);

  const handleCloseUpdatePasswordModal = useCallback(() => {
    setIsUpdatePasswordModalVisible(false);
  }, []);

  const handleOpenDeleteAccountModal = useCallback(() => {
    setIsDeleteAccountModalVisible(true);
  }, []);

  const handleCloseDeleteAccountModal = useCallback(() => {
    setIsDeleteAccountModalVisible(false);
  }, []);

  const handleUpdateName = useCallback(
    async (name: string) => {
      const success = await updateName({ name });
      if (success) {
        handleCloseUpdateNameModal();
      }
    },
    [updateName, handleCloseUpdateNameModal]
  );

  const handleUpdateEmail = useCallback(
    async (email: string, password: string) => {
      const success = await updateEmail({ email, password });
      if (success) {
        publish(tProfile("updateEmail.success"));
        handleCloseUpdateEmailModal();
      }
    },
    [updateEmail, handleCloseUpdateEmailModal, publish, tProfile]
  );

  const handleUpdatePassword = useCallback(
    async (newPassword: string, password: string) => {
      const success = await updatePassword({ newPassword, password });
      if (success) {
        publish(tProfile("updatePassword.success"));
        handleCloseUpdatePasswordModal();
      }
    },
    [updatePassword, handleCloseUpdatePasswordModal, publish, tProfile]
  );

  const handleDeleteAccount = useCallback(
    async (password: string) => {
      const success = await deleteAccount({ password });
      if (success) {
        publish(tProfile("deleteAccount.success"));
        navigation.navigate("Welcome");
      }
    },
    [deleteAccount, navigation, publish, tProfile]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    navigation.navigate("Welcome");
  }, [logout, navigation]);

  const handleLogoutFromAllDevices = useCallback(async () => {
    await logoutFromAllDevices();
    navigation.navigate("Welcome");
  }, [logoutFromAllDevices, navigation]);

  const handleSetDailyCaloriesLimit = useCallback(
    (limit: number | undefined) => {
      dispatch(setDailyCaloriesLimit(limit));
    },
    [dispatch]
  );

  const handleSetDailyProteinLimit = useCallback(
    (limit: number | undefined) => {
      dispatch(setDailyProteinLimit(limit));
    },
    [dispatch]
  );

  const handleSetDailyFatLimit = useCallback(
    (limit: number | undefined) => {
      dispatch(setDailyFatLimit(limit));
    },
    [dispatch]
  );

  const handleSetDailyCarbohydratesLimit = useCallback(
    (limit: number | undefined) => {
      dispatch(setDailyCarbohydratesLimit(limit));
    },
    [dispatch]
  );

  const handleSaveLimits = useCallback(() => {
    const isValid = (value: number | undefined): boolean => {
      if (value === undefined) return true; // undefined is allowed (no limit)
      return !isNaN(value) && value >= 0 && isFinite(value);
    };

    const allValid =
      isValid(dailyCaloriesLimit) &&
      isValid(dailyProteinLimit) &&
      isValid(dailyFatLimit) &&
      isValid(dailyCarbohydratesLimit);

    if (allValid) {
      // Limits are automatically saved to Redux persist
      publish(t("saveSuccess"));
    } else {
      publish(t("saveError"));
    }
  }, [dailyCaloriesLimit, dailyProteinLimit, dailyFatLimit, dailyCarbohydratesLimit, publish, t]);

  const handleChangeLanguage = useCallback((language: "pl" | "en") => {
    i18n.changeLanguage(language);
  }, []);

  return {
    userProfile,
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
  };
};
