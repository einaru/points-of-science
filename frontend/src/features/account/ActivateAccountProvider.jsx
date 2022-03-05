import React from "react";

export const ActivateAccountContext = React.createContext();

function ActivateAccountProvider({ children }) {
  const [username, setUsername] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);

  const accountContext = React.useMemo(
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
