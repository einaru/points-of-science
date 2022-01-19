import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../../shared/styles";
import { AuthContext } from "../../services/auth/AuthProvider";

function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { logIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={() => logIn({ username, password })}>
        Log in
      </Button>
      <Text>Do not have an account yet?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Create account")}>
        <Text>Create one</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
