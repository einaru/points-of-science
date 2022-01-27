import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Loading from "../../shared/components/Loading";
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
    }
  }
`;

export default function SetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { username, setAccountPassword: setAccountPasswords } = useContext(
    ActivateAccountContext
  );

  const [activateAccount, { data, loading, error }] =
    useMutation(ACTIVATE_ACCOUNT);

  useEffect(() => {
    console.debug(data);
    if (data && data.activateAccount.type === "success") {
      console.log("Account is activated");
      console.debug(data);
      setAccountPasswords(password, confirmPassword);
    }
  }, [data, password, confirmPassword, setAccountPasswords]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
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
