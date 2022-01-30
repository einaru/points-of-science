import React, { useContext, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import styles from "../../shared/styles";
import { AuthContext } from "../../services/auth/AuthProvider";
import FormView from "./FormView";
import NavigationLink from "./NavigationLink";

function CreateAccountScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { createAccount } = useContext(AuthContext);

  return (
    <FormView>
      <TextInput label="Username" value={username} onChange={setUsername} />
      <TextInput
        label="Password"
        value={password}
        onChange={setPassword}
        secureTextEntry
      />
      <TextInput
        label="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={styles.formAction}
        onPress={() => createAccount({ username, password, confirmPassword })}
      >
        Create account
      </Button>
      <NavigationLink
        label="Log in"
        message="Already have an account?"
        screenName="Login"
      />
    </FormView>
  );
}

export default CreateAccountScreen;
