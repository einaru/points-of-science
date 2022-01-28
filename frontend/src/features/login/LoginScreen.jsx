import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { gql, useMutation } from "@apollo/client";
import styles from "../../shared/styles";
import { AuthContext } from "../../services/auth/AuthProvider";
import Loading from "../../shared/components/Loading";

export const LOGIN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      type
      status
      message
      data {
        accessToken
        refreshToken
        user {
          id
          username
        }
      }
    }
  }
`;

function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { logInUser } = useContext(AuthContext);
  const [logIn, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (data && data.signIn.type === "success") {
      const { user, accessToken, refreshToken } = data.signIn.data;
      logInUser(user, accessToken, refreshToken);
    }
  }, [data, logInUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

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
      <Button
        mode="contained"
        onPress={() => {
          logIn({ variables: { username, password } });
        }}
      >
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
