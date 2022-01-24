import React, { useReducer, useEffect, useMemo, createContext } from "react";
import { gql, useApolloClient } from "@apollo/client";
import authReducer from "./authReducer";
import * as Storage from "../storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: false,
    isLogout: false,
    authToken: null,
  });

  useEffect(() => {
    const initState = async () => {
      let token;
      try {
        token = await Storage.getItem("authToken");
      } catch (e) {
        // TODO Handle error logging
      }
      // TODO validate token
      dispatch({ type: "restoreToken", token });
    };
    initState();
  }, []);

  const client = useApolloClient();

  const authContext = useMemo(
    () => ({
      ...state,
      logIn: async ({ username, password }) => {
        client
          .mutate({
            mutation: gql`
              mutation signIn($name: String!, $password: String!) {
                signIn(name: $name, password: $password) {
                  type
                  data {
                    access_token
                    refresh_token
                  }
                }
              }
            `,
            variables: { name: username, password },
          })
          .then(({ data }) => {
            console.log(data);
            if (data.signIn.type === "success") {
              const token = data.signIn.data.access_token;
              Storage.setItem("authToken", token);
              dispatch({ type: "login", token });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      logOut: () => dispatch({ type: "logOut" }),
      createAccount: (data) => {
        // TODO Link up with backend
        console.log("Got create account data:", data);
      },
    }),
    [state, dispatch, client]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
