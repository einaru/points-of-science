import React, { useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import Loading from "../../shared/components/Loading";
import { ActivateAccountContext } from "./ActivateAccountProvider";

const ACTIVATE_ACCOUNT = gql`
  mutation activateAccount(username: String!, password: String!, confirmPassword: String!) {
    activateAccount(username: $username, password: $password, confirmPassword: $confirmPassword) {
      type
      status
      message
    }
  }
`;

function ActivateAccountPasswordScreen() {
  const {
    username,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = useContext(ActivateAccountContext);

  const navigation = useNavigation();

  const [activateAccount, { loading, errors, data }] =
    useMutation(ACTIVATE_ACCOUNT);

  if (loading) {
    return <Loading />;
  }

  if (errors) {
    // TODO provide feedback to user on errors
  }

  // TODO ensure successful response data
  if (data) {
    navigation.navigate("Login");
  }
  return (
    <View>
      <TextInput
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <TextInput
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      <Button onPress={activateAccount(username, password, confirmPassword)}>
        Activate account
      </Button>
    </View>
  );
}

export default ActivateAccountPasswordScreen;
