import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as Storage from "../storage";
import { getNewToken, isTokenValid } from "./token";

// Cached access token to avoid async calls for every request
// This will be reset upon 401 server error's
let cachedToken;

const withToken = setContext(() => {
  if (cachedToken) {
    return { token: cachedToken };
  }
  return Storage.getItem("accessToken").then((accessToken) => {
    cachedToken = accessToken;
    return { token: cachedToken };
  });
});

const withAuth = setContext(async (_, { headers, token }) => {
  let accessToken = token;

  if (!isTokenValid(accessToken)) {
    accessToken = await getNewToken();
    Storage.setItem("accessToken", accessToken);
    cachedToken = accessToken;
  }

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const resetToken = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    cachedToken = null;
  }
});

const authLink = withToken.concat(withAuth).concat(resetToken);

export default authLink;
