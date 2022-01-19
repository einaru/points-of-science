function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        authToken: action.token,
        isLoading: false,
      };
    case "logout":
      return {
        ...state,
        authToken: null,
        isLogout: true,
      };
    default:
      return new Error();
  }
}
export default authReducer;