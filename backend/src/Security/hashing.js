// Server directory imports:
import bcrypt from "bcrypt";
import config from "../Config/config.js";

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
          type: config.responseType.success,
          data: { hashedPassword },
        });
      })
      .catch((error) => {
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
          type: config.responseType.success,
          data: { is_matching: isMatching },
        });
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

export { hashPassword, comparePassword };
