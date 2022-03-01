import React, { useContext, useEffect, useRef, useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { useMutation } from "@apollo/client";
import AuthContext from "../../services/auth/AuthContext";
import FormView from "./FormView";
import FormLink from "./FormLink";
import { t } from "../i18n";
import FormAction from "./FormAction";
import LOGIN from "./Login.gql";

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

  const passwordRef = useRef();

  const doLogIn = () => {
    logIn({ variables: { username, password } });
  };

  return (
    <FormView>
      <TextInput
        label={t("Username")}
        value={username}
        onChangeText={setUsername}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        ref={passwordRef}
        label={t("Password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        onSubmitEditing={doLogIn}
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
        onPress={doLogIn}
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
