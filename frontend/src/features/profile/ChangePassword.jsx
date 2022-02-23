import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import AuthContext from "../../services/auth/AuthContext";
import { t } from "../i18n";
import CHANGE_PASSWORD from "./ChangePassword.gql";
import styles from "./ChangePassword.style";

function ChangePassword() {
  const { user } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const showSnackbar = () => setVisibleSnackbar(true);
  const hideSnackbar = () => setVisibleSnackbar(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [changePassword, { data, loading }] = useMutation(CHANGE_PASSWORD, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    if (data?.changePassword) {
      showSnackbar();
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          label={t("New password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={toggleShowPassword}
            />
          }
        />
        <TextInput
          label={t("Confirm new password")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={toggleShowConfirmPassword}
            />
          }
        />
        <HelperText type="error" visible={errorMessage}>
          {errorMessage}
        </HelperText>
        <Button
          mode="contained"
          loading={loading}
          onPress={() => {
            changePassword({
              variables: { userID: user.id, password, confirmPassword },
            });
          }}
        >
          {t("Change password")}
        </Button>
      </View>
      <Snackbar
        visible={visibleSnackbar}
        duration={5000}
        onDismiss={hideSnackbar}
      >
        {t("Your password is updated")}
      </Snackbar>
    </View>
  );
}

export default ChangePassword;
