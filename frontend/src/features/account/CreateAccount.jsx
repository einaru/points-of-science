import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../auth/AuthProvider";
import FormView from "./FormView";
import FormLink from "./FormLink";
import { t } from "../i18n";
import FormAction from "./FormAction";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isDisabled = !username && !password && !confirmPassword;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const { createAccount } = useContext(AuthContext);

  return (
    <FormView>
      <TextInput
        label={t("Username")}
        value={username}
        onChange={setUsername}
      />
      <TextInput
        label={t("Password")}
        value={password}
        onChange={setPassword}
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
        onChange={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? "eye-off" : "eye"}
            onPress={toggleShowConfirmPassword}
          />
        }
      />
      <FormAction
        label={t("Create account")}
        mode="contained"
        disabled={isDisabled}
        onPress={() => createAccount({ username, password, confirmPassword })}
      />
      <FormLink
        label={t("Log in")}
        message={t("Already have an account?")}
        screenName="account:login"
      />
    </FormView>
  );
}

export default CreateAccount;
