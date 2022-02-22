const { createContext } = require("react");

const PreferencesContext = createContext({
  toggleTheme: () => {},
  prefersDarkTheme: false,
});

export default PreferencesContext;
