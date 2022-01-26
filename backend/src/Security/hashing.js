// Server directory imports:
import bcrypt from "bcrypt";
import { config } from "../internal.js";

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt()
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hashedPassword) => {
        return resolve({
          status: 200,
          type: config.env.RESPONSE_TYPE.success,
          data: { hashed_password: hashedPassword },
        });
      })
      .catch((error) => {
        // TO-DO: Implement error handler to take care of the error and provide a proper response to the user.
        return reject(error);
      });
  });
}

function comparePassword(userPassword, storedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(userPassword, storedPassword)
      .then((isMatching) => {
        return resolve({
          status: 200,
          type: config.env.RESPONSE_TYPE.success,
          data: { is_matching: isMatching },
        });
      })
      .catch((error) => {
        // TO-DO: Implement error handler to take care of the error and provide a proper response to the user.
        return reject(error);
      });
  });
}

export { hashPassword, comparePassword };
