export const initialState = {
  isAuthenticated: false,
  user: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "restoreUser":
      return {
        ...state,
        user: action.user,
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
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return new Error();
  }
}
