import bcrypt from "bcrypt";

//Server directory imports:

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
          type: "success",
          data: { hashed_password: hashedPassword },
        });
      })
      .catch((error) => {
        //TO-DO: Implement error handler to take care of the error and provide a proper response to the user.
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
          type: "success",
          data: { is_matching: isMatching },
        });
      })
      .catch((error) => {
        //TO-DO: Implement error handler to take care of the error and provide a proper response to the user.
        return reject(error);
      });
  });
}

export { hashPassword, comparePassword };
