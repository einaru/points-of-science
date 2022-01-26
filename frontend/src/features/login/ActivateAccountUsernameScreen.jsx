import React, { useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useLazyQuery } from "@apollo/client";
import Loading from "../../shared/components/Loading";
import { ActivateAccountContext } from "./ActivateAccountProvider";

const VERIFY_USERNAME = gql`
  query verifyUsername(username: String!) {
    verifyUsername(username: $username) {
      type
      status
      message
    }
  }
`;

function ActivateAccountUsernameScreen() {
  const { username, setUsername } = useContext(ActivateAccountContext);

  const navigation = useNavigation();

  const [verifyUsername, { called, loading, data }] =
    useLazyQuery(VERIFY_USERNAME);

  if (called && loading) {
    return <Loading />;
  }

  // TODO ensure that the response data is success
  if (data) {
    navigation.navigate("Account password");
  }

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <Button onPress={verifyUsername(username)}>Next</Button>
    </View>
  );
}

export default ActivateAccountUsernameScreen;
