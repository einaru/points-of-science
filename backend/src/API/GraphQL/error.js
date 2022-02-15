/* eslint-disable max-classes-per-file */
import { GraphQLError } from "graphql";

export class ApiError extends GraphQLError {
  constructor(message, extensions, code) {
    super(message);
    Object.defineProperty(this, "name", { value: "ApiError" });
    this.extensions = {
      ...extensions,
      code,
    };
  }
}

export class AuthenticationError extends ApiError {
  constructor(message, extensions) {
    super(message, "UNAUTHENTICATED", extensions);
    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}
