import fetch from "cross-fetch";
import { HttpLink } from "@apollo/client";
import Constants from "expo-constants";

const { apiEndpoint } = Constants.manifest.extra;

const httpLink = new HttpLink({ uri: apiEndpoint, fetch });

export default httpLink;