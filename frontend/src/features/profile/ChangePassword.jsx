import { useMutation } from "@apollo/client";
import React from "react";
import { HelperText, Snackbar, TextInput } from "react-native-paper";

import { FormAction, FormView } from "~shared/components";
import { t } from "~shared/i18n";

import CHANGE_PASSWORD from "./ChangePassword.gql";

function ChangePassword() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);

  const isDisabled = !password && !confirmPassword;

  const showSnackbar = () => setVisibleSnackbar(true);
  const hideSnackbar = () => setVisibleSnackbar(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [changePassword, { data, loading }] = useMutation(CHANGE_PASSWORD, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  React.useEffect(() => {
    if (data?.changePassword) {
      showSnackbar();
    }
  }, [data]);

  const confirmRef = React.useRef();

  const doChangePassword = () => {
    setErrorMessage("");
    changePassword({ variables: { password, confirmPassword } });
  };

  return (
    <>
      <FormView>
        <TextInput
          label={t("New password")}
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
          label={t("Confirm new password")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          onSubmitEditing={doChangePassword}
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
          label={t("Change password")}
          loading={loading}
          disabled={isDisabled}
          onPress={doChangePassword}
        />
      </FormView>
      <Snackbar
        visible={visibleSnackbar}
        duration={5000}
        onDismiss={hideSnackbar}
      >
        {t("Your password is updated")}
      </Snackbar>
    </>
  );
}

export default ChangePassword;
