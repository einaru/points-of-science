import fetch from "cross-fetch";
import Constants from "expo-constants";
import jwtDecode from "jwt-decode";
import * as Storage from "../storage";

export function isTokenValid(token) {
  let valid = true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now().valueOf() / 1000;
    if (decoded.exp < currentTime) {
      valid = false;
    }
  } catch (error) {
    console.error("Error decoding access token:", error);
    valid = false;
  }
  return valid;
}

export async function getNewToken() {
  const { apiEndpoint } = Constants.manifest.extra;
  const refreshToken = await Storage.getItem("refreshToken");
  const token = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query getNewToken($refreshToken: String!) {
          getNewToken(refreshToken: $refreshToken) {
            accessToken
          }
        }
      `,
      variables: { refreshToken },
    }),
  })
    .then((response) => response.json())
    .then(({ data }) => {
      return data?.getNewToken.accessToken;
    });
  return token;
}