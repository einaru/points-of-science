import React, { createContext, useMemo, useReducer } from "react";

const initialState = {
  isVerified: false,
  isActivated: false,
  username: "",
  password: "",
  confirmPassword: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "verifyUsername":
      return {
        ...state,
        isVerified: true,
        username: action.username,
      };
    case "activateAccount":
      return {
        ...state,
        isActivated: true,
        password: action.password,
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
      setVerifiedUsername: (username) => {
        dispatch({ type: "verifyUsername", username });
      },
      setAccountPasswords: (password, confirmPassword) => {
        dispatch({ type: "activateAccount", password, confirmPassword });
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
