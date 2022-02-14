import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import {
  updateData,
  getDataFromDatabaseByFilter,
  hashPassword,
} from "../../src/internal.js";
import config from "../../src/Config/config.js";

function initializeData() {
  const filename = fileURLToPath(import.meta.url);
  const here = dirname(filename);

  const filePathToDatabase = path.resolve(
    here,
    "../../assets/Static/dummy_data.json"
  );

  return JSON.parse(fs.readFileSync(filePathToDatabase, "utf-8"));
}

function addAccount(user) {
  return new Promise((resolve, reject) => {
    getDataFromDatabaseByFilter("username", user.username, config.db.table.user)
      .then((userObject) => {
        if (userObject[0] != null) {
          user.id = userObject[0].id;
          user.state = 2;
          return hashPassword(user.password);
        }

        throw new Error("User does not exist");
      })
      .then((result) => {
        const { hashedPassword } = result.data;
        user.password = hashedPassword;
        return updateData(config.db.table.user, user);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function activateAccounts(data) {
  const userList = data.User.slice(0, 10);
  const users = [];
  userList.forEach((user) => {
    users.push(addAccount(user));
  });

  return users;
}

function getSignUpArgs(data, index) {
  const userData = data.User[index];
  const { username, password } = userData;
  return {
    username,
    password,
    confirmPassword: password,
  };
}

export { initializeData, activateAccounts, getSignUpArgs };
