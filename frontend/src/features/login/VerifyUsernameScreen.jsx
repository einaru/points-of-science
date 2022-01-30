import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Loading from "../../shared/components/Loading";
import styles from "../../shared/styles";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import FormView from "./FormView";
import NavigationLink from "./NavigationLink";

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
      <NavigationLink
        label="Log in"
        message="Already activated your account?"
        screenName="Login"
      />
    </FormView>
  );
}
