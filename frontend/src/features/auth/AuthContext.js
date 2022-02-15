import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  refreshToken: null,
  logInUser: () => {},
  logOutUser: () => {},
  createAccount: () => {},
});

export default AuthContext;
