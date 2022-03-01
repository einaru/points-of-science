import { AuthenticationError, ForbiddenError, UserInputError } from "./error.js";
import config from "../../Config/config.js";

export function assertIsAuthenticated(user) {
  if (!user) {
    throw new AuthenticationError("User is not authenticated.");
  }
}

export function assertIsAdmin(user) {
  if (user && user.permission !== config.permissionLevel.admin) {
    throw new ForbiddenError("Admin permission is required.");
  }
}

export function assertIsExperimental(user) {
  if(user && user.permission !== config.permissionLevel.experimental) {
    throw new ForbiddenError("Expermental permission is required.");
  }
}

export function assertTextInput(text, inputType) {
  if (text == null) {
    throw new UserInputError(`${inputType} cannot be null.`);
  }

  if (typeof text !== "string") {
    throw new Error(`${inputType} must be a string.`);
  }
}
