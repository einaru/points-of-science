import { useLazyQuery } from "@apollo/client";
import React from "react";
import { HelperText, TextInput } from "react-native-paper";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import { t } from "../i18n";
import FormAction from "./FormAction";
import VERIFY_USERNAME from "./VerifyUsername.gql";

export default function VerifyUsername() {
  const [errorMessage, setErrorMessage] = React.useState("");

  const { username, setUsername, setIsVerified } = React.useContext(
    ActivateAccountContext
  );

  const isDisabled = username === "";

  const [verifyUsername, { called, loading, data, error }] =
    useLazyQuery(VERIFY_USERNAME);

  React.useEffect(() => {
    if (data?.verifyUsername) {
      setIsVerified(true);
      setErrorMessage("");
    }
    if (error) {
      setErrorMessage(error.message);
    }
  }, [data, error, username, setIsVerified]);

  const doVerifyUsername = () => {
    verifyUsername({ variables: { username } });
  };

  return (
    <>
      <TextInput
        label={t("Username")}
        value={username}
        onChangeText={(text) => setUsername(text)}
        onSubmitEditing={doVerifyUsername}
      />
      <HelperText type="error" visible={errorMessage}>
        {errorMessage}
      </HelperText>
      <FormAction
        label={t("Verify username")}
        loading={called && loading}
        disabled={isDisabled}
        onPress={doVerifyUsername}
      />
    </>
  );
}
