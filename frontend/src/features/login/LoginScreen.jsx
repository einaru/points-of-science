import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../services/auth/AuthProvider";
import Loading from "../../shared/components/Loading";
import FormView from "./FormView";
import styles from "../../shared/styles";
import NavigationLink from "./NavigationLink";

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

  const { logInUser } = useContext(AuthContext);
  const [logIn, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (data && data.signIn.type === "success") {
      const { user, accessToken, refreshToken } = data.signIn.data;
      logInUser(user, accessToken, refreshToken);
    }
  }, [data, logInUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

  return (
    <FormView>
      <TextInput label="Username" value={username} onChangeText={setUsername} />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={styles.formAction}
        onPress={() => {
          logIn({ variables: { username, password } });
        }}
      >
        Log in
      </Button>
      <NavigationLink
        message="Haven't activated your account yet?"
        label="Activate account"
        screenName="Activate account"
      />
    </FormView>
  );
}

export default LoginScreen;
