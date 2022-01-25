export const initialState = {
  isAuthenticated: false,
  refreshToken: null,
  user: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "restoreUser":
      return {
        ...state,
        user: action.user,
        refreshToken: action.refreshToken,
      };
    case "restoreToken":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "login":
      return {
        ...state,
        user: action.user,
        refreshToken: action.refreshToken,
        isAuthenticated: true,
      };
    case "logout":
      return initialState;
    default:
      return new Error();
  }
}
