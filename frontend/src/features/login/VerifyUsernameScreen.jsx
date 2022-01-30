import { gql, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Loading from "../../shared/components/Loading";
import styles from "../../shared/styles";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import FormView from "./FormView";

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
    <FormView>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button
        mode="contained"
        style={styles.formAction}
        onPress={() => {
          verifyUsername({ variables: { username } });
        }}
      >
        Verify username
      </Button>
      <Text>Already activated your account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Log in</Text>
      </TouchableOpacity>
    </FormView>
  );
}
