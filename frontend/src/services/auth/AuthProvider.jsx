import React, { useReducer, useEffect, useMemo, createContext } from "react";
import { useApolloClient } from "@apollo/client";
import authReducer from "./authReducer";
import * as Query from "./query";
import * as Storage from "../storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: false,
    isLogout: false,
    accessToken: null,
  });

  useEffect(() => {
    const initState = async () => {
      let accessToken;
      try {
        accessToken = await Storage.getItem("accessToken");
      } catch (e) {
        // TODO Handle error logging
      }
      // TODO validate token
      dispatch({ type: "restoreToken", accessToken });
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
            mutation: Query.LOGIN,
            variables: { name: username, password },
          })
          .then(({ data }) => {
            console.log(data);
            if (data.signIn.type === "success") {
              const accessToken = data.signIn.data.access_token;
              Storage.setItem("accessToken", accessToken);
              dispatch({ type: "login", accessToken });
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
