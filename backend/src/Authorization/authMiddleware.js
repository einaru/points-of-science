import jwt from "jsonwebtoken";
import config from "../Config/config";

export default function authMiddleware(req, _, next) {
  req.user = null;
  if (req.headers.authorization) {
    const [scheme, token] = req.headers.authorization;
    if (scheme === "Bearer" && token) {
      jwt.verify(token, config.secret.accessToken, (error, payload) => {
        if (!error) {
          req.user = payload;
        }
      });
    }
    next();
  }
}
