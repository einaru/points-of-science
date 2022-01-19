import React, { useReducer, useEffect, useMemo, createContext } from "react";
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
      try {
        const token = await Storage.getItem();
        if (token) {
          dispatch({ type: "login", token });
        }
      } catch (e) {
        // TODO Handle error logging
      }
    };
    initState();
  }, []);

  const authContext = useMemo(
    () => ({
      ...state,
      logIn: (data) => {
        // TODO Link up with backend
        console.log("Got login data:", data);
        dispatch({ type: "login", token: "dummy-auth-token" });
      },
      logOut: () => dispatch({ type: "logOut" }),
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
