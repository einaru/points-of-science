import React, { useContext, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import styles from "../../shared/styles";
import { AuthContext } from "../../services/auth/AuthProvider";
import FormView from "./FormView";
import NavigationLink from "./NavigationLink";
import { t } from "../i18n";

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
      <Button
        mode="contained"
        style={styles.formAction}
        onPress={() => createAccount({ username, password, confirmPassword })}
      >
        {t("Create account")}
      </Button>
      <NavigationLink
        label={t("Log in")}
        message={t("Already have an account?")}
        screenName="Login"
      />
    </FormView>
  );
}

export default CreateAccountScreen;
