import { useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import { t } from "../i18n";
import FormAction from "./FormAction";
import VERIFY_USERNAME from "./VerifyUsername.gql";

export default function VerifyUsername() {
  const [errorMessage, setErrorMessage] = useState("");

  const { username, setUsername, setIsVerified } = useContext(
    ActivateAccountContext
  );

  const isDisabled = username === "";

  const [verifyUsername, { called, loading, data, error }] =
    useLazyQuery(VERIFY_USERNAME);

  useEffect(() => {
    if (data?.verifyUsername) {
      console.log("Verify username got data:", data);
      setIsVerified(true);
      setErrorMessage("");
    }
    if (error) {
      setErrorMessage(error.message);
    }
  }, [data, error, username, setIsVerified]);

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
