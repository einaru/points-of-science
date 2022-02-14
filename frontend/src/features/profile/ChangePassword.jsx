import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import { useEffect } from "react/cjs/react.development";
import { AuthContext } from "../auth/AuthProvider";
import { t } from "../i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    margin: 8,
  },
});

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $userID: String!
    $password: String!
    $confirmPassword: String!
  ) {
    changePassword(
      id: $userID
      password: $password
      confirmPassword: $confirmPassword
    ) {
      type
      status
      message
    }
  }
`;

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

  const [changePassword, { data, loading, error }] =
    useMutation(CHANGE_PASSWORD);

  useEffect(() => {
    if (data) {
      const { type, message } = data.changePassword;
      if (type === "success") {
        showSnackbar();
      }
      setErrorMessage(type === "error" ? message : "");
    }
  }, [data]);

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

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
