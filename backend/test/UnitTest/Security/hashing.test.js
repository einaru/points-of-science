import data from "../../DataSet/hashing_data_set.json";
import {
  config,
  connectToDatabase,
  hashPassword,
  comparePassword,
  resetTestData,
} from "../../../src/internal.js";

let plainText;
let hash;

beforeAll(() => {
  connectToDatabase();
  resetTestData(config.env.ENVIRONMENT_MODE.TEST.dummy_data);
  plainText = data["1"].plain_text;
  hash = data["1"].hash;
});

test("Hash password.", () => {
  return hashPassword(plainText).then((result) => {
    const expectedResult = {
      status: 200,
      type: config.env.RESPONSE_TYPE.success,
      data: { hashed_password: hash },
    };

    expect(result).not.toEqual(expectedResult);
  });
});

test("Make hashing throw an error", () => {
  return hashPassword(null).catch((error) =>
    expect(error.message).toMatch("data and salt arguments required")
  );
});

test("Compare password", () => {
  return comparePassword(plainText, hash).then((result) => {
    const expectedResult = {
      status: 200,
      type: config.env.RESPONSE_TYPE.success,
      data: { is_matching: true },
    };

    expect(result).toEqual(expectedResult);
  });
});

test("Make compare password throw an error", () => {
  return comparePassword(1, hash).catch((error) => {
    expect(error.message).toMatch("data and hash must be strings");
  });
});
