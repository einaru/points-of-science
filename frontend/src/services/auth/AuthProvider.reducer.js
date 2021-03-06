export const initialState = {
  loading: false,
  isAuthenticated: false,
  refreshToken: null,
  sessionToken: null,
  subscribeToken: null,
  user: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "login":
      return {
        ...state,
        user: action.user,
        refreshToken: action.refreshToken,
        sessionToken: action.refreshToken,
        subscribeToken: action.subscribeToken,
        isAuthenticated: true,
        loading: false,
      };
    case "logout":
      return initialState;
    default:
      return new Error();
  }
}
