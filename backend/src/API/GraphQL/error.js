/* eslint-disable max-classes-per-file */
import { GraphQLError } from "graphql";

export class ApiError extends GraphQLError {
  constructor(message, code, extensions) {
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

export class ForbiddenError extends ApiError {
  constructor(message, extensions) {
    super(message, "FORBIDDEN", extensions);
    Object.defineProperty(this, "name", { value: "ForbiddenError" });
  }
}

export class UserInputError extends ApiError {
  constructor(message, extensions) {
    super(message, "BAD_USER_INPUT", extensions);
    Object.defineProperty(this, "name", { value: "UserInputError" });
  }
}
