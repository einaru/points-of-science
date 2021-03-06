import {
  authenticateAccessToken,
  authenticateRefreshToken,
  connectToDatabase,
  createAccessToken,
  createRefreshToken,
  deleteRefreshTokenFromDatabase,
  getData,
  getDataFromDatabaseByFilter,
} from "../../../src/internal.js";
import config from "../../../src/Config/config.js";

let user;
let refreshTokenTable;
let userTable;

beforeAll(async () => {
  connectToDatabase();
  refreshTokenTable = config.db.table.refreshToken;
  userTable = config.db.table.user;
  const userData = await getDataFromDatabaseByFilter(
    "id",
    "fQcf5jOFOZqzfKvFE7o4",
    userTable
  );

  [user] = userData;
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
  return createRefreshToken(user)
    .then((refreshToken) => {
      return Promise.all([getData(refreshTokenTable), refreshToken]);
    })
    .then((data) => {
      const refreshTokenList = [data[0][0].id];
      const refreshToken = data[1];
      const expectedResult = true;
      const result = refreshTokenList.includes(refreshToken);
      expect(result).toBe(expectedResult);
    });
});

test("Create refresh token throw error when user is null.", () => {
  return createRefreshToken(null).catch((error) => {
    expect(error.message).toEqual(
      "Cannot read properties of null (reading 'id')"
    );
  });
});

test("Authenticate refresh token.", () => {
  return getData(refreshTokenTable)
    .then((refreshTokenList) => {
      const refreshToken = refreshTokenList[0].id;
      return authenticateRefreshToken(refreshToken);
    })
    .then((accessToken) => {
      const result = accessToken.trim().length > 0;
      const expectedResult = true;
      expect(result).toEqual(expectedResult);
    });
});

test("Authenticate with a null token.", () => {
  expect.assertions(1);
  return authenticateRefreshToken(null).catch((error) => {
    const expectedResult = {
      status: 403,
      type: "error",
      message: "Refresh token is invalid.",
    };
    expect(error).toEqual(expectedResult);
  });
});

test("Delete a stored refresh token from database.", () => {
  return getData(refreshTokenTable)
    .then((refreshTokenListBefore) => {
      const refreshToken = refreshTokenListBefore[0].id;
      return Promise.all([
        deleteRefreshTokenFromDatabase(refreshToken),
        getData(refreshTokenTable),
        refreshTokenListBefore,
      ]);
    })
    .then((data) => {
      const refreshTokenListAfter = data[1];
      const refreshTokenListBefore = data[2];
      const expectedResult = refreshTokenListBefore.length;
      const result = refreshTokenListAfter.length;
      expect(result).toBe(expectedResult);
    });
});

test("Delete a stored refresh token when no refresh tokens exists.", () => {
  return getData(refreshTokenTable)
    .then((refreshTokenList) => {
      const refreshToken = refreshTokenList[0];
      return deleteRefreshTokenFromDatabase(refreshToken);
    })
    .then((result) => {
      const expectedResult = {
        status: 200,
        type: "success",
        message: "User is already signed out.",
      };
      expect(result).toEqual(expectedResult);
    });
});
