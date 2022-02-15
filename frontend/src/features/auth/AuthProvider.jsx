import React, { useReducer, useEffect, useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { reducer, initialState } from "./reducer";
import * as Query from "./query";
import * as Storage from "../../services/storage";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const client = useApolloClient();

  useEffect(() => {
    const initState = async () => {
      const user = JSON.parse(await Storage.getItem("user"));
      const refreshToken = await Storage.getItem("refreshToken");
      console.log("Restore user:", user);
      dispatch({ type: "restoreUser", user, refreshToken });
      if (user) {
        client
          .query({ query: Query.VERIFY_TOKEN, fetchPolicy: "network-only" })
          .then(() => {
            dispatch({ type: "restoreToken" });
          })
          .catch((error) => {
            console.debug(error.message);
          });
      }
    };
    initState();
  }, [client]);

  const authContext = useMemo(
    () => ({
      ...state,
      logInUser: (user, accessToken, refreshToken) => {
        Storage.setItem("user", JSON.stringify(user));
        Storage.setItem("accessToken", accessToken);
        Storage.setItem("refreshToken", refreshToken);
        dispatch({ type: "login", user, refreshToken });
      },
      logOutUser: () => {
        Storage.removeItem("accessToken");
        Storage.removeItem("refreshToken");
        Storage.removeItem("user");
        dispatch({ type: "logout" });
      },
      createAccount: (data) => {
        // TODO Link up with backend
        console.log("Got create account data:", data);
      },
    }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
