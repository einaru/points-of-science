import {
  config,
  connectToDatabase,
  getDatabase,
  JSONProvider,
  profileCreator,
  resetTestData,
} from "../../../src/internal.js";

let database;
let collectionName;
let userData;
let user;
let password;
let confirmPassword;
let shortPassword;
let notMatch;

beforeAll(async () => {
  connectToDatabase();
  resetTestData(config.env.ENVIRONMENT_MODE.TEST.dummy_data);
  database = getDatabase();
  collectionName = config.env.USER_TABLE;
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
    expect(result).toMatch("error");
  });
});

test("Swap permission", () => {});
