import React, { useContext, useEffect, useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../auth/AuthProvider";
import FormView from "./FormView";
import FormLink from "./FormLink";
import { t } from "../i18n";
import FormAction from "./FormAction";

export const LOGIN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      type
      status
      message
      data {
        accessToken
        refreshToken
        user {
          id
          username
        }
      }
    }
  }
`;

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { logInUser } = useContext(AuthContext);
  const [logIn, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (data) {
      if (data.signIn.type === "success") {
        const { user, accessToken, refreshToken } = data.signIn.data;
        logInUser(user, accessToken, refreshToken);
        setErrorMessage("");
      } else {
        setErrorMessage(data.signIn.message);
      }
    }
  }, [data, logInUser]);

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

  return (
    <FormView>
      <TextInput
        label={t("Username")}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label={t("Password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <HelperText type="error" visible={errorMessage}>
        {errorMessage}
      </HelperText>
      <FormAction
        label={t("Log in")}
        loading={loading}
        onPress={() => {
          logIn({ variables: { username, password } });
        }}
      />
      <FormLink
        message={t("Haven't activated your account yet?")}
        label={t("Activate account")}
        screenName="Activate account"
      />
    </FormView>
  );
}

export default LoginScreen;
