const passwordErrors = {
  len: "8 characters or more and less than 32 characters",
  upperCase: "upper case",
  lowerCase: "lower case",
  numberCase: "numbers",
  specialChar: "special characters",
};

function checkPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function isValidLength(text, minLength, maxLength) {
  return text.trim().length >= minLength && text.trim().length <= maxLength;
}

function isInString(text, checkFor) {
  return new Promise((resolve, reject) => {
    try {
      const checkForList = Array.from(checkFor);
      const foundList = checkForList.filter((letter) => {
        return text.includes(letter);
      });

      resolve(foundList.length > 0);
    } catch (error) {
      reject(error);
    }
  });
}

function validatePassword(password) {
  return new Promise((resolve, reject) => {
    if (password === null) {
      reject(Error("Password cannot be null."));
      return;
    }
    let { len, upperCase, lowerCase, numberCase, specialChar } = false;
    len = isValidLength(password, 8, 64);
    upperCase = isInString(password, "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ");
    lowerCase = isInString(password, "abcdefghijklmnopqrstuvwxyzæøå");
    numberCase = isInString(password, "0123456789");
    specialChar = isInString(password, "!@#\"'$%^ &*()+-,./:;<>=?[]\\_'{}|~");

    Promise.all([len, upperCase, lowerCase, numberCase, specialChar])
      .then((data) => {
        resolve({
          len: data[0],
          upperCase: data[1],
          lowerCase: data[2],
          numberCase: data[3],
          specialChar: data[4],
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function isValidPassword(args) {
  return (
    args.len &&
    (args.upperCase || args.lowerCase || args.numberCase || args.specialChar)
  );
}

function errorsInPassword(args) {
  const errors = ["Password can contain "];
  const keys = Object.keys(args).filter((key) => {
    return args[key] === false;
  });

  const len = keys.length;
  keys.forEach((key, index) => {
    if (index === 0) {
      errors.push(`${passwordErrors[key]}`);
    } else {
      if (index < len - 1) {
        errors.push(`, `);
      } else if (index === len - 1) {
        if (len > 2) {
          errors.push(`, and `);
        } else {
          errors.push(` and `);
        }
      }

      errors.push(`${passwordErrors[key]}`);
    }
  });
  errors.push(`.`);
  return errors;
}

function concatinateErrors(message, error) {
  return `${message}${error}`;
}

function generateErrorMessage(errors) {
  return errors.reduce(concatinateErrors);
}

export {
  checkPassword,
  errorsInPassword,
  generateErrorMessage,
  validatePassword,
  isValidPassword,
};
