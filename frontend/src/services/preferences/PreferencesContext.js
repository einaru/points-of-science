import React from "react";

const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  prefersDarkTheme: false,
});

export default PreferencesContext;
