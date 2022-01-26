import React, { createContext, useMemo, useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "username":
      return {
        ...state,
        username: action.username,
      };
    case "password":
      return {
        ...state,
        password: action.password,
      };
    case "confirmPassword":
      return {
        ...state,
        confirmPassword: action.confirmPassword,
      };
    default:
      return new Error();
  }
}

export const ActivateAccountContext = createContext();

function ActivateAccountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const accountContext = useMemo(
    () => ({
      ...state,
      setUsername: (username) => {
        dispatch({ type: "username", username });
      },
      setPassword: (password) => {
        dispatch({ type: "password", password });
      },
      setConfirmPassword: (confirmPassword) => {
        dispatch({ type: "confirmPassword", confirmPassword });
      },
    }),
    [state, dispatch]
  );
  return (
    <ActivateAccountContext.Provider value={accountContext}>
      {children}
    </ActivateAccountContext.Provider>
  );
}

export default ActivateAccountProvider;
