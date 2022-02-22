import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  refreshToken: null,
  sessionToken: null,
  logInUser: () => {},
  logOutUser: () => {},
});

export default AuthContext;
