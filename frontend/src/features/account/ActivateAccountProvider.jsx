import React, { createContext, useMemo, useState } from "react";

export const ActivateAccountContext = createContext();

function ActivateAccountProvider({ children }) {
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const accountContext = useMemo(
    () => ({
      username,
      isVerified,
      setUsername,
      setIsVerified,
      resetUsername: () => {
        setUsername("");
        setIsVerified(false);
      },
    }),
    [username, isVerified, setUsername, setIsVerified]
  );
  return (
    <ActivateAccountContext.Provider value={accountContext}>
      {children}
    </ActivateAccountContext.Provider>
  );
}

export default ActivateAccountProvider;
