import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Snackbar,
  TextInput,
  Title,
} from "react-native-paper";
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
  backButton: {
    marginTop: 8,
  },
});

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $userID: Int!
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
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const showSnackbar = () => setVisibleSnackbar(true);
  const hideSnackbar = () => setVisibleSnackbar(false);

  const reset = () => {
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

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
        <Title>Change password</Title>
        <TextInput
          label={t("New password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          label={t("Confirm new password")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
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
        <Button
          style={styles.backButton}
          icon="arrow-left"
          onPress={() => {
            reset();
            navigation.goBack();
          }}
        >
          {t("Go back")}
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
