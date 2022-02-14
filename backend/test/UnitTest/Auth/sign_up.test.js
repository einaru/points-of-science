import {
  connectToDatabase,
  signUp,
  updateData,
} from "../../../src/internal.js";
import {
  activateAccounts,
  getSignUpArgs,
  initializeData,
} from "../../Util/utility.js";
import config from "../../../src/Config/config.js";

let data;
let signUpArgs;
let nonValidArgs;

beforeAll(async () => {
  try {
    connectToDatabase();
    data = initializeData();
    const promises = activateAccounts(data);
    await Promise.all(promises);
    signUpArgs = getSignUpArgs(data, 14);
    nonValidArgs = {
      username: "notvalid",
      password: "thisisvalidpassword",
      confirmPassword: "thisisvalidpassword",
    };
  } catch (error) {
    console.log("[-] An error occurred:", error);
  }
});

afterAll(async () => {
  await updateData(config.db.table.user, {
    id: "rmsUuDoKyZxBnlPxTEvH",
    username: "Dotty Mansford",
    password: "RbTGb8ndas9",
    permission: 3,
    achievement: [],
    challenge: [],
    state: 1,
  });
});

test("Register user", () => {
  return signUp(signUpArgs).then((result) => {
    const expectedResult = config.responseType.success;
    expect(result.type).toEqual(expectedResult);
  });
});

test("Register with non valid username", () => {
  return signUp(nonValidArgs).catch((result) => {
    const expectedResult = {
      message: "User already exists and has an active account.",
      status: 400,
      type: config.responseType.error,
    };
    expect(result).toEqual(expectedResult);
  });
});
