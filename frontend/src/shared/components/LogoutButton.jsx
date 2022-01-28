import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { Button } from "react-native-paper";
import { AuthContext } from "../../services/auth/AuthProvider";
import Loading from "./Loading";

const LOGOUT = gql`
  mutation signOut($refreshToken: String!) {
    signOut(refreshToken: $refreshToken) {
      type
      status
      message
    }
  }
`;

export default function LogoutButton() {
  const { logOutUser, refreshToken } = useContext(AuthContext);
  const [logOut, { data, loading, error }] = useMutation(LOGOUT);

  useEffect(() => {
    if (data && data.signOut.type === "success") {
      logOutUser();
    }
  }, [data, logOutUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

  return (
    <Button
      onPress={async () => {
        logOut({ variables: { refreshToken } });
      }}
    >
      Log out
    </Button>
  );
}
