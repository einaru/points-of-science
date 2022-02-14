import data from "../../DataSet/hashing_data_set.json";
import {
  connectToDatabase,
  hashPassword,
  comparePassword,
} from "../../../src/internal.js";
import config from "../../../src/Config/config.js";

let plainText;
let hash;

beforeAll(() => {
  connectToDatabase();
  plainText = data["1"].plain_text;
  hash = data["1"].hash;
});

test("Hash password.", () => {
  return hashPassword(plainText).then((result) => {
    const expectedResult = {
      status: 200,
      type: config.responseType.success,
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
      type: config.responseType.success,
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
