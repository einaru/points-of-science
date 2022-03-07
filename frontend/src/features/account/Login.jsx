import { useMutation } from "@apollo/client";
import React from "react";
import { HelperText, TextInput } from "react-native-paper";

import AuthContext from "~services/auth/AuthContext";
import { t } from "~shared/i18n";

import FormAction from "./FormAction";
import FormLink from "./FormLink";
import FormView from "./FormView";
import LOGIN from "./Login.gql";

function LoginScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { logInUser } = React.useContext(AuthContext);
  const [logIn, { data, loading }] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const isDisabled = !username && !password;

  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  React.useEffect(() => {
    if (data?.signIn) {
      const { user, accessToken, refreshToken, subscribeToken } = data.signIn;
      logInUser(user, accessToken, refreshToken, subscribeToken);
      setErrorMessage("");
    }
  }, [data, logInUser]);

  const passwordRef = React.useRef();

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
