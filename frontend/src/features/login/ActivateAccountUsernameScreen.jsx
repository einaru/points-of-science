import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useLazyQuery } from "@apollo/client";
import Loading from "../../shared/components/Loading";

const VERIFY_USERNAME = gql`
  query verifyUsername($username: String!) {
    verifyUsername(username: $username) {
      type
      status
      message
    }
  }
`;

function ActivateAccountUsernameScreen() {
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const [verifyUsername, { called, loading, data }] =
    useLazyQuery(VERIFY_USERNAME);

  if (called && loading) {
    return <Loading />;
  }

  if (data && data.verifyUsername.type === "success") {
    console.debug(data);
    // FIXME need to navigate to the password screen
    navigation.navigate("Account password", { username });
  }

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button
        onPress={() => {
          verifyUsername({ variables: { username } });
        }}
      >
        Next
      </Button>
    </View>
  );
}

export default ActivateAccountUsernameScreen;
