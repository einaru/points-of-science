const passwordErrors = {
  len: "Password must be 8 characters or longer or less than 32 characters.",
  upperCase: "Password can contain upper case letters.",
  lowerCase: "Password can contain lower case letter.",
  numberCase:
    "Password can contain numbers to strengthen the password (Optional).",
  specialChar:
    "Password can contain special characters to strengthen the password (Optional).",
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
  const errors = [];
  Object.keys(args).forEach((key) => {
    if (!args[key]) {
      errors.push(passwordErrors[key]);
    }
  });
  return errors;
}

function concatinateErrors(message, error) {
  const newMessage = `${message} ${error} `;
  return newMessage;
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
