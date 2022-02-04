import React, { createContext, useMemo, useReducer } from "react";

const initialState = {
  isVerified: false,
  username: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "verifyUsername":
      return {
        ...state,
        isVerified: true,
        username: action.username,
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
