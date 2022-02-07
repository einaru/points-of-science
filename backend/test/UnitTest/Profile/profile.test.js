import {
  connectToDatabase,
  JSONProvider,
  profileCreator,
  resetTestData,
} from "../../../src/internal.js";
import config from "../../../src/Config/config.js";

let collectionName;
let userData;
let user;
let password;
let confirmPassword;
let shortPassword;
let notMatch;

beforeAll(async () => {
  connectToDatabase();
  resetTestData(config.db.test.data);
  collectionName = config.db.table.user;
  userData = await JSONProvider.getDataByFilter(collectionName, {
    key: "id",
    value: 1,
  });
  [userData] = userData;
  user = profileCreator();
  user.updateData(userData);
  password = "ThisIs0nlyATest";
  confirmPassword = "ThisIs0nlyATest";
  shortPassword = "short";
  notMatch = "thisPasswordHasNoMatch";
});

test("Update name", () => {});

test("Change password", () => {
  return user.changePassword(password, confirmPassword).then(() => {
    const expectedResult = true;
    const result = user.data.password !== userData.password;
    expect(result).toEqual(expectedResult);
  });
});

test("No matching password", () => {
  return user.changePassword(notMatch, confirmPassword).catch((data) => {
    const expectedResult = true;
    const result = data.trim().length > 0;
    expect(result).toEqual(expectedResult);
  });
});

test("Too short password", () => {
  return user.changePassword(shortPassword, shortPassword).catch((data) => {
    const expectedResult = true;
    const result = data.trim().length > 0;
    expect(result).toEqual(expectedResult);
  });
});

test("Change password to null", () => {
  return user.changePassword(null, null).catch((result) => {
    expect(result).toEqual("Password cannot be null.");
  });
});

test("Swap permission", () => {});
