import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { gql, useMutation } from "@apollo/client";
import Loading from "../../shared/components/Loading";

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
    }
  }
`;

function ActivateAccountPasswordScreen({ username }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [activateAccount, { data, loading, error }] =
    useMutation(ACTIVATE_ACCOUNT);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

  if (data && data.activateAccount.type === "success") {
    console.log("Account is activated");
    console.debug(data);
  }

  return (
    <View>
      <Text>Username: {username}</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <Button
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

export default ActivateAccountPasswordScreen;
