import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../../shared/styles";
import { AuthContext } from "../../services/auth/AuthProvider";

function CreateAccountScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { createAccount } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChange={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => createAccount({ username, password, confirmPassword })}
      >
        Create account
      </Button>
      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateAccountScreen;
