import { gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Modal,
  TextInput,
  Title,
} from "react-native-paper";
import { t } from "../i18n";

const styles = StyleSheet.create({
  modal: {
    padding: 8,
  },
  container: {
    backgroundColor: "white",
    padding: 8,
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

function ChangePassword({ userID, client, visible, onDismiss }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dismiss = useCallback(() => {
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    onDismiss();
  }, [onDismiss]);

  const changePassword = useCallback(() => {
    client
      .mutate({
        mutation: CHANGE_PASSWORD,
        variables: {
          userID,
          password,
          confirmPassword,
        },
      })
      .then((response) => {
        const { type, message } = response.data.changePassword;
        if (type === "success") {
          dismiss();
        }
        setPasswordError(type === "error" ? message : "");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dismiss, client, userID, password, confirmPassword]);

  return (
    <Modal style={styles.modal} visible={visible} onDismiss={dismiss}>
      <View style={styles.container}>
        <Title>Change password</Title>
        <TextInput
          label={t("Password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          label={t("Confirm password")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <HelperText type="error" visible={passwordError}>
          {passwordError}
        </HelperText>
        <Button
          mode="contained"
          onPress={() => {
            changePassword({
              variables: { userID, password, confirmPassword },
            });
          }}
        >
          {t("Change password")}
        </Button>
      </View>
    </Modal>
  );
}

export default ChangePassword;
