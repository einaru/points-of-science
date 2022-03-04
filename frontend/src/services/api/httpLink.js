import fetch from "cross-fetch";
import Constants from "expo-constants";
import { HttpLink } from "@apollo/client";

const { apiEndpoint } = Constants.manifest.extra;

const httpLink = new HttpLink({ uri: apiEndpoint, fetch });

export default httpLink;
