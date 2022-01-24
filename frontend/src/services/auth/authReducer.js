function authReducer(state, action) {
  switch (action.type) {
    case "restoreToken":
      return {
        ...state,
        accessToken: action.accessToken,
        isLoading: false,
      };
    case "login":
      return {
        ...state,
        accessToken: action.accessToken,
        isLoading: false,
      };
    case "logout":
      return {
        ...state,
        accessToken: null,
        isLogout: true,
      };
    default:
      return new Error();
  }
}
export default authReducer;
