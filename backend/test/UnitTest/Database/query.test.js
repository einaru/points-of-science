import {
  config,
  connectToDatabase,
  deleteData,
  getData,
  getDatabase,
  getDataByFilter,
  nextID,
  resetTestData,
  updateData,
} from "../../../src/internal.js";

let collectionName;
let nonExistingCollectionName;
let filter;
let user;
let newTable;
let database;

beforeAll(() => {
  connectToDatabase();
  resetTestData(config.env.ENVIRONMENT_MODE.TEST.dummy_data);
  database = getDatabase();
  collectionName = config.env.USER_TABLE;
  nonExistingCollectionName = "NotATableName";
  filter = { key: "name", value: "Rayna Harteley" };
  user = getDataByFilter(collectionName, { key: "id", value: 1 })[0];
  newTable = "Other_Users";
});

test("Next id for table and increment by one.", () => {
  const dataList = getData(collectionName);
  const result = nextID(dataList);
  const expectedResult = dataList.length + 1;
  expect(result).toBe(expectedResult);
});

test("Next id handle null.", () => {
  try {
    expect.assertions(1);
    nextID(null);
  } catch (error) {
    const expectedResult = `Table is not an array.`;
    const result = error.message;
    expect(result).toEqual(expectedResult);
  }
});

test("Get data from database.", () => {
  const result = getData(collectionName);
  const expectedResult = database[collectionName];
  expect(result).toEqual(expectedResult);
});

test("Get data return null if table does not exist.", () => {
  const expectedResult = null;
  const result = getData(nonExistingCollectionName);
  expect(result).toEqual(expectedResult);
});

test("Get data by filter from database.", () => {
  const result = getDataByFilter(collectionName, filter);
  const expectedResult = [
    {
      id: 58,
      name: "Rayna Harteley",
      password: "q6EImS",
      permission: "experimental",
      achievement: [],
      challenge: [],
    },
  ];
  expect(result).toEqual(expectedResult);
});

test("Get data by filter throw error if table does not exist.", () => {
  try {
    expect.assertions(1);
    getDataByFilter(nonExistingCollectionName, filter);
  } catch (error) {
    const expectedResult = `Attempt to filter a table which do not exist.`;
    const result = error.message;
    expect(result).toEqual(expectedResult);
  }
});

test("Create data in database.", () => {
  const id = nextID(database[collectionName]);
  const newUser = {
    id: id,
    name: "Ola Nordmann",
    password: "thisIsNOtAnActualpassWord",
    permission: "control",
    achievement: [],
    challenge: [],
  };

  updateData(collectionName, newUser);
  const result = getDataByFilter(collectionName, {
    key: "id",
    value: newUser.id,
  });
  const expectedResult = [newUser];
  expect(result).toEqual(expectedResult);
});

test("Create data creates table in database if table does not exist.", () => {
  const newUser = {
    id: 1,
    name: "Ola Nordmann",
    password: "thisIsNOtAnActualpassWord",
    permission: "control",
    achievement: [],
    challenge: [],
  };

  updateData(newTable, newUser);
  const expectedResult = [newUser];
  const result = getData(newTable);
  expect(result).toEqual(expectedResult);
});

test("Update data in database.", () => {
  user.permission = "experimental";
  updateData(collectionName, user);
  const result = getDataByFilter(collectionName, { key: "id", value: user.id });
  const expectedResult = [user];
  expect(result).toEqual(expectedResult);
});

test("Delete data in database.", () => {
  deleteData(collectionName, user);
  const result = getDataByFilter(collectionName, { key: "id", value: user.id });
  const expectedResult = [];
  expect(result).toEqual(expectedResult);
});

test("Delete data returns false if table does not exist.", () => {
  const expectedResult = false;
  const result = deleteData(nonExistingCollectionName, user);
  expect(result).toEqual(expectedResult);
});
