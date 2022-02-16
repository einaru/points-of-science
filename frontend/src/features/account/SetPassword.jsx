import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import AuthContext from "../auth/AuthContext";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import { t } from "../i18n";
import FormAction from "./FormAction";

const ACTIVATE_ACCOUNT = gql`
  mutation activateAccount(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    activateAccount(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      accessToken
      refreshToken
      user {
        id
        username
      }
    }
  }
`;

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isDisabled = !password && !confirmPassword;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const { username } = useContext(ActivateAccountContext);
  const { logInUser } = useContext(AuthContext);

  const [activateAccount, { data, loading }] = useMutation(ACTIVATE_ACCOUNT, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    if (data?.activateAccount) {
      const { user, accessToken, refreshToken } = data.activateAccount;
      logInUser(user, accessToken, refreshToken);
      setErrorMessage("");
    }
  }, [data, logInUser]);

  return (
    <>
      <TextInput
        style={{ marginBottom: 16 }}
        label={t("Username")}
        value={username}
        disabled
        right={<TextInput.Icon name="check" />}
      />
      <TextInput
        label={t("Password")}
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
        label={t("Confirm password")}
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
      <FormAction
        label={t("Activate account")}
        loading={loading}
        disabled={isDisabled}
        onPress={() => {
          activateAccount({
            variables: { username, password, confirmPassword },
          });
        }}
      />
    </>
  );
}
