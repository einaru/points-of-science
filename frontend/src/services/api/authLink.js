import { setContext } from "@apollo/client/link/context";
import * as Storage from "../storage";
import { getNewToken, isTokenValid } from "./token";

const withToken = setContext(async () => {
  const accessToken = await Storage.getItem("accessToken");
  return { token: accessToken };
});

const withAuth = setContext(async (_, { headers, token }) => {
  let accessToken = token;

  if (!isTokenValid(accessToken)) {
    accessToken = await getNewToken();
  }

  if (accessToken) {
    Storage.setItem("accessToken", accessToken);
  }

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const authLink = withToken.concat(withAuth);

export default authLink;
