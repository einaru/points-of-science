import { AuthenticationError, ForbiddenError } from "./error.js";
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
