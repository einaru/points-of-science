import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import FormView from "./FormView";
import FormLink from "./FormLink";
import { t } from "../i18n";
import FormAction from "./FormAction";

const VERIFY_USERNAME = gql`
  query verifyUsername($username: String!) {
    verifyUsername(username: $username) {
      type
      status
      message
    }
  }
`;

export default function VerifyUsername() {
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

  return (
    <FormView>
      <TextInput
        label={t("Username")}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <HelperText type="error" visible={errorMessage}>
        {errorMessage}
      </HelperText>
      <FormAction
        label={t("Verify username")}
        loading={called && loading}
        onPress={() => {
          verifyUsername({ variables: { username } });
        }}
      />
      <FormLink
        label={t("Log in")}
        message={t("Already activated your account?")}
        screenName="account:login"
      />
    </FormView>
  );
}
