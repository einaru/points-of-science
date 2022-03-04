import React from "react";
import { useApolloClient } from "@apollo/client";
import * as Storage from "../storage";
import AuthContext from "./AuthContext";
import VERIFY_TOKEN from "./AuthProvider.gql";
import { initialState, reducer } from "./AuthProvider.reducer";

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const client = useApolloClient();

  const logInUser = (user, accessToken, refreshToken) => {
    Storage.setItem("user", JSON.stringify(user));
    Storage.setItem("accessToken", accessToken);
    Storage.setItem("refreshToken", refreshToken);
    dispatch({ type: "login", user, refreshToken });
  };

  const logOutUser = () => {
    Storage.removeItem("accessToken");
    Storage.removeItem("refreshToken");
    Storage.removeItem("user");
    dispatch({ type: "logout" });
  };

  React.useEffect(() => {
    const initState = async () => {
      dispatch({ type: "loading" });
      const user = JSON.parse(await Storage.getItem("user"));
      const refreshToken = await Storage.getItem("refreshToken");
      const accessToken = await Storage.getItem("accessToken");
      if (user) {
        client
          .query({ query: VERIFY_TOKEN, fetchPolicy: "network-only" })
          .then(() => {
            logInUser(user, accessToken, refreshToken);
          })
          .catch((error) => {
            console.debug(error.message);
            logOutUser();
          });
      } else {
        dispatch({ type: "logout" });
      }
    };
    initState();
    return () => client.stop();
  }, [client]);

  const authContext = React.useMemo(
    () => ({
      ...state,
      logInUser,
      logOutUser,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
