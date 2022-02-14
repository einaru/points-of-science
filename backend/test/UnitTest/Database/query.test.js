import {
  connectToDatabase,
  deleteData,
  getData,
  getDataFromDatabaseByFilter,
  nextID,
  updateData,
} from "../../../src/internal.js";
import config from "../../../src/Config/config.js";

let collectionName;
let nonExistingCollectionName;
let user;
let newTable;

beforeAll(async () => {
  connectToDatabase();
  collectionName = config.db.table.user;
  nonExistingCollectionName = "NotATableName";
  const userData = await getDataFromDatabaseByFilter(
    "username",
    "Antonietta Riccard",
    collectionName
  );
  [user] = userData;
  newTable = "Other_Users";
});

test("Next id for table", () => {
  const id = nextID(collectionName);
  const expectedResult = true;
  const result = id.length !== 0;
  expect(result).toEqual(expectedResult);
});

test("Next id throws error on null.", () => {
  expect(() => nextID(null)).toThrow(Error);
});

test("Get data from database.", () => {
  return getData(collectionName).then((result) => {
    const expectedResult = true;
    expect(Array.isArray(result)).toEqual(expectedResult);
  });
});

test("Get data return null if table does not exist.", () => {
  return getData(nonExistingCollectionName).then((result) => {
    const expectedResult = [];
    expect(result).toEqual(expectedResult);
  });
});

test("Get data by filter from database.", () => {
  return getDataFromDatabaseByFilter(
    "username",
    "Lorinda Habron",
    collectionName
  ).then((result) => {
    const expectedResult = 1;
    expect(result.length).toBe(expectedResult);
  });
});

test("Get data by filter throw error if table does not exist.", () => {
  return getDataFromDatabaseByFilter(
    "username",
    "Lorinda Habron",
    nonExistingCollectionName
  ).catch((error) => {
    const expectedResult = `Attempt to filter a table which do not exist.`;
    const result = error.message;
    expect(result).toEqual(expectedResult);
  });
});

test("Create data in database.", () => {
  const id = nextID(collectionName);
  const newUser = {
    id,
    username: "Ola Nordmann",
    password: "thisIsNOtAnActualpassWord",
    permission: 2,
    achievements: [],
    challenges: [],
  };

  return updateData(collectionName, newUser)
    .then(() => {
      return getDataFromDatabaseByFilter("id", newUser.id, collectionName);
    })
    .then((result) => {
      const expectedResult = [newUser];
      expect(result).toEqual(expectedResult);
    });
});

test("Create data creates table in database if table does not exist.", () => {
  const newUser = {
    id: 1,
    username: "Ola Nordmann",
    password: "thisIsNOtAnActualpassWord",
    permission: 3,
    achievements: [],
    challenges: [],
  };

  return updateData(newTable, newUser)
    .then(() => {
      return getData(newTable);
    })
    .then((result) => {
      const expectedResult = [newUser];
      expect(result).toEqual(expectedResult);
    });
});

test("Update data in database.", () => {
  user.permission = 2;
  return updateData(collectionName, user)
    .then(() => {
      return getDataFromDatabaseByFilter("id", user.id, collectionName);
    })
    .then((result) => {
      const expectedResult = [user];
      expect(result).toEqual(expectedResult);
    });
});

test("Delete data in database.", () => {
  return deleteData(collectionName, user)
    .then(() => {
      return getDataFromDatabaseByFilter("id", user.id, collectionName);
    })
    .then((result) => {
      const expectedResult = 1;
      expect(result.length).toEqual(expectedResult);
    });
});

test("Delete data returns false if table does not exist.", () => {
  return deleteData(nonExistingCollectionName, user).then((result) => {
    const expectedResult = false;
    expect(result).toEqual(expectedResult);
  });
});
