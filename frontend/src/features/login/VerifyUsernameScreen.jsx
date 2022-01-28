import { gql, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Loading from "../../shared/components/Loading";
import styles from "../../shared/styles";
import { ActivateAccountContext } from "./ActivateAccountProvider";

const VERIFY_USERNAME = gql`
  query verifyUsername($username: String!) {
    verifyUsername(username: $username) {
      type
      status
      message
    }
  }
`;

export default function VerifyUsernameScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const { setVerifiedUsername } = useContext(ActivateAccountContext);
  const [verifyUsername, { called, loading, data }] =
    useLazyQuery(VERIFY_USERNAME);

  useEffect(() => {
    if (data) {
      console.debug(data.verifyUsername.message);
      if (data.verifyUsername.type === "success") {
        console.debug(data);
        setVerifiedUsername(username);
      }
    }
  }, [data, username, setVerifiedUsername]);

  if (called && loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text>Verify username</Text>
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
      <Text>Already activated your account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
