import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AuthContext } from "../../services/auth/AuthProvider";
import Loading from "../../shared/components/Loading";
import styles from "../../shared/styles";
import { ActivateAccountContext } from "./ActivateAccountProvider";

const ACTIVATE_ACCOUNT = gql`
  mutation activateAccount(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    activateAccount(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
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

export default function SetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { username } = useContext(ActivateAccountContext);
  const { logInUser } = useContext(AuthContext);

  const [activateAccount, { data, loading, error }] =
    useMutation(ACTIVATE_ACCOUNT);

  useEffect(() => {
    if (data) {
      console.debug(data.activateAccount.message);
      if (data.activateAccount.type === "success") {
        console.log("Account is activated");
        const { user, accessToken, refreshToken } = data.activateAccount.data;
        logInUser(user, accessToken, refreshToken);
      }
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
      <Text>Username: {username}</Text>
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label="Confirm password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={styles.formAction}
        onPress={() => {
          activateAccount({
            variables: { username, password, confirmPassword },
          });
        }}
      >
        Activate account
      </Button>
    </View>
  );
}
