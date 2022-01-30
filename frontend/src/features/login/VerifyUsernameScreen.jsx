import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
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
  const [errorMessage, setErrorMessage] = useState("");

  const { setVerifiedUsername } = useContext(ActivateAccountContext);

  const [verifyUsername, { called, loading, data }] =
    useLazyQuery(VERIFY_USERNAME);

  useEffect(() => {
    if (data) {
      console.debug(data);
      if (data.verifyUsername.type === "success") {
        setVerifiedUsername(username);
        setErrorMessage("");
      } else {
        setErrorMessage(data.verifyUsername.message);
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
      <HelperText type="error" visible={errorMessage}>
        {errorMessage}
      </HelperText>
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
