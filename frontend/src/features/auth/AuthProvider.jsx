import React, { useReducer, useEffect, useMemo, createContext } from "react";
import { useApolloClient } from "@apollo/client";
import { reducer, initialState } from "./reducer";
import * as Query from "./query";
import * as Storage from "../../services/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const client = useApolloClient();

  useEffect(() => {
    const initState = async () => {
      const user = JSON.parse(await Storage.getItem("user"));
      const refreshToken = await Storage.getItem("refreshToken");
      console.log("Restore user:", user);
      dispatch({ type: "restoreUser", user, refreshToken });
      if (user) {
        const { data } = await client.query({ query: Query.VERIFY_TOKEN });
        if (data.verifyToken.type === "error") {
          client
            .query({
              query: Query.GET_NEW_TOKEN,
              variables: { refreshToken },
            })
            .then((resp) => {
              if (resp.data.getNewToken.type === "success") {
                const { accessToken } = resp.data.getNewToken.data;
                Storage.setItem("accessToken", accessToken);
                dispatch({ type: "restoreToken" });
              }
            });
        } else {
          dispatch({ type: "restoreToken" });
        }
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
