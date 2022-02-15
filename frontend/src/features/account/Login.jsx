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
      accessToken
      refreshToken
      user {
        id
        username
      }
    }
  }
`;

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { logInUser } = useContext(AuthContext);
  const [logIn, { data, loading }] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const isDisabled = !username && !password;

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (data?.signIn) {
      const { user, accessToken, refreshToken } = data.signIn;
      logInUser(user, accessToken, refreshToken);
      setErrorMessage("");
    }
  }, [data, logInUser]);

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
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
          />
        }
      />
      <HelperText type="error" visible={errorMessage}>
        {errorMessage}
      </HelperText>
      <FormAction
        label={t("Log in")}
        loading={loading}
        disabled={isDisabled}
        onPress={() => {
          logIn({ variables: { username, password } });
        }}
      />
      <FormLink
        message={t("Haven't activated your account yet?")}
        label={t("Activate account")}
        screenName="account:activate"
      />
    </FormView>
  );
}

export default LoginScreen;
