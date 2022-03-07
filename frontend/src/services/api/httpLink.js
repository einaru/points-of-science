import { HttpLink } from "@apollo/client";
import fetch from "cross-fetch";
import Constants from "expo-constants";

const { httpEndpoint } = Constants.manifest.extra;

const httpLink = new HttpLink({ uri: httpEndpoint, fetch });

export default httpLink;
