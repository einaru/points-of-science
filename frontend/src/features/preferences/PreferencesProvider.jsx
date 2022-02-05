import React, { useCallback, useMemo, useState } from "react";
import PreferencesContext from "./PreferencesContext";

function PreferencesProvider({ children }) {
  const [prefersDarkTheme, setPrefersDarkTheme] = useState(false);

  const toggleTheme = useCallback(() => {
    return setPrefersDarkTheme(!prefersDarkTheme);
  }, [prefersDarkTheme]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      prefersDarkTheme,
    }),
    [toggleTheme, prefersDarkTheme]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

export default PreferencesProvider;
