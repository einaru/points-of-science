import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../auth/AuthProvider";
import FormView from "./FormView";
import FormLink from "./FormLink";
import { t } from "../i18n";
import FormAction from "./FormAction";

function CreateAccountScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        secureTextEntry
      />
      <TextInput
        label={t("Confirm password")}
        value={confirmPassword}
        onChange={setConfirmPassword}
        secureTextEntry
      />
      <FormAction
        label={t("Create account")}
        mode="contained"
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

export default CreateAccountScreen;
