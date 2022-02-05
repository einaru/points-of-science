import { setContext } from "@apollo/client/link/context";
import * as Storage from "../storage";

const authLink = setContext(async (_, { headers }) => {
  const token = await Storage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default authLink;
