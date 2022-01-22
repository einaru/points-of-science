import data from "../../../assets/Database/Test/dummy_data.json";
import {
  connectToDatabase,
  getData,
  authenticateAccessToken,
  authenticateRefreshToken,
  createAccessToken,
  createRefreshToken,
  deleteRefreshTokenFromDatabase
} from "../../../src/internal.js";

let user;
let refreshTokenTable;

beforeAll(async () => {
  connectToDatabase();
  user = data['User'][4];
  refreshTokenTable = 'refresh_token';
});

test("Create access token.", () => {
  const accessToken = createAccessToken(user);
  const expectedResult = true;
  const result = accessToken.trim().length > 0;
  expect(result).toEqual(expectedResult);
});

test("Create access token throw error when user is null.", () => {
    expect(() => createAccessToken(null)).toThrow(Error);
});

test("Create refresh token and store in database.", () => {
  const refreshToken = createRefreshToken(user);
  const refreshTokenList = getData(refreshTokenTable);
  const expectedResult = true;
  const result = refreshTokenList.includes(refreshToken);
  expect(result).toBe(expectedResult);
});

test("Create refresh token throw error when user is null.", () => {
    expect(() => createRefreshToken(null)).toThrow(Error);
});

test("Authenticate refresh token.", () => {
  const refreshTokenList = getData(refreshTokenTable);
  const refreshToken = refreshTokenList[0];
  return authenticateRefreshToken(refreshToken)
  .then(access_token => {
    const result = access_token.trim().length > 0;
    const expectedResult = true;
    expect(result).toEqual(expectedResult);
  });
});

test("Authenticate with a null token.", () => {
  expect.assertions(1);
  return authenticateRefreshToken(null)
  .catch(error => {
    const expectedResult = {
      status: 403,
      type: "error",
      message: "Refresh token is invalid."
    }
    expect(error).toEqual(expectedResult);
  });
});

test("Delete a stored refresh token from database.", () => {
  const refreshTokenListBefore = getData(refreshTokenTable);
  const refreshToken = refreshTokenListBefore[0];
  const expectedResult = refreshTokenListBefore.length - 1;
  deleteRefreshTokenFromDatabase(refreshToken);
  const refreshTokenListAfter = getData(refreshTokenTable);
  const result = refreshTokenListAfter.length;
  expect(result).toBe(expectedResult);
});

test("Delete a stored refresh token when no refresh tokens exists.", () => {
  const refreshTokenList = getData(refreshTokenTable);
  const refreshToken = refreshTokenList[0];
  const expectedResult = {
    status: 200,
    type: "success",
    message: "User is already signed out.",
  }
  const result = deleteRefreshTokenFromDatabase(refreshToken);
  expect(result).toEqual(expectedResult);
});
