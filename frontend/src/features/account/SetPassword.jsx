import { useMutation } from "@apollo/client";
import React from "react";
import { HelperText, TextInput } from "react-native-paper";

import AuthContext from "~services/auth/AuthContext";
import { t } from "~shared/i18n";

import { ActivateAccountContext } from "./ActivateAccountProvider";
import FormAction from "./FormAction";
import ACTIVATE_ACCOUNT from "./SetPassword.gql";

export default function SetPassword() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const isDisabled = !password && !confirmPassword;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const { username } = React.useContext(ActivateAccountContext);
  const { logInUser } = React.useContext(AuthContext);

  const [activateAccount, { data, loading }] = useMutation(ACTIVATE_ACCOUNT, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  React.useEffect(() => {
    if (data?.activateAccount) {
      const { user, accessToken, refreshToken, subscribeToken } =
        data.activateAccount;
      logInUser(user, accessToken, refreshToken, subscribeToken);
      setErrorMessage("");
    }
  }, [data, logInUser]);

  const confirmRef = React.useRef();

  const doActivateAccount = () => {
    activateAccount({
      variables: { username, password, confirmPassword },
    });
  };

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
        returnKeyType="next"
        onSubmitEditing={() => confirmRef.current.focus()}
        blurOnSubmit={false}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
          />
        }
      />
      <TextInput
        ref={confirmRef}
        label={t("Confirm password")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        onSubmitEditing={doActivateAccount}
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
        onPress={doActivateAccount}
      />
    </>
  );
}
