import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../../shared/styles";
import { AuthContext } from "../../services/auth/AuthProvider";
import FormView from "./FormView";

function CreateAccountScreen() {
  const navigation = useNavigation();

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
      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Log in</Text>
      </TouchableOpacity>
    </FormView>
  );
}

export default CreateAccountScreen;
