import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { ActivateAccountContext } from "./ActivateAccountProvider";
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
  const [errorMessage, setErrorMessage] = useState("");

  const { username, setUsername, setIsVerified } = useContext(
    ActivateAccountContext
  );

  const isDisabled = username === "";

  const [verifyUsername, { called, loading, data }] =
    useLazyQuery(VERIFY_USERNAME);

  useEffect(() => {
    if (data) {
      if (data.verifyUsername.type === "success") {
        setIsVerified(true);
        setErrorMessage("");
      } else {
        setErrorMessage(data.verifyUsername.message);
      }
    }
  }, [data, username, setIsVerified]);

  return (
    <>
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
        disabled={isDisabled}
        onPress={() => {
          verifyUsername({ variables: { username } });
        }}
      />
    </>
  );
}
