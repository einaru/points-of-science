import data from "../../DataSet/DatabaseMockData/dummy_data.json";
import {
  config,
  getData,
  getDataByFilter,
  updateData,
  deleteData,
  findLatestID
} from "../../../src/internal.js";

let database;
let collectionName;
let nonExistingCollectionName;
let filter;
let user;

beforeAll(async () => {
  database = data;
  collectionName = "User";
  nonExistingCollectionName = "NotATableName";
  filter = { key: "name", value: "Rayna Harteley" };
  user = data[collectionName][1];
});

test("Find latest id for table and increment by one.", () => {
  const dataList = getData(collectionName);
  const result = findLatestID(dataList);
  const expectedResult = dataList.length + 1;
  expect(result).toBe(expectedResult);
});

test("Find latest id handle null.", () => {
  const dataList = getData(collectionName);
  const result = findLatestID(null);
  const expectedResult = dataList.length + 1;
  expect(result).toBe(expectedResult);
});

test("Get data from database using dummy data.", () => {
  const result = getData(collectionName);
  const expectedResult = database[collectionName];
  expect(result).toEqual(expectedResult);
});

test("Get data throw error if table does not exist.", () => {
  try{
    expect.assertions(1);
    const result = getData(nonExistingCollectionName);
    const expectedResult = [];
    expect(result).toEqual(expectedResult);
  } catch(error){
    const expectedResult = {
      message: "Attempt to access a table which does not exist.",
      status: 400,
      type: config.env.RESPONSE_TYPE.error
    }
    expect(error).toEqual(expectedResult);
  }
});

test("Get data by filter from database using dummy data.", () => {
  const result = getDataByFilter(collectionName, filter);
  const expectedResult = [{
    id: 58,
    name: "Rayna Harteley",
    password: "q6EImS",
    permission: "experimental",
    achievement: [],
    challenge: [],
  }];
  expect(result).toEqual(expectedResult);
});

test("Get data by filter throw error if table does not exist.", () => {
  try{
    expect.assertions(1);
    const result = getDataByFilter(nonExistingCollectionName, filter);
    const expectedResult = [];
    expect(result).toEqual(expectedResult);
  } catch(error){
    const expectedResult = {
      message: "Attempt to access a table which does not exist.",
      status: 400,
      type: config.env.RESPONSE_TYPE.error
    }
    expect(error).toEqual(expectedResult);
  }
});

test("Create data in database.", () => {
  const id = findLatestID('User');
  const newUser = {
    "id": id,
    "name": "Ola Nordmann",
    "password": "thisIsNOtAnActualpassWord",
    "permission": "control",
    "achievement": [],
    "challenge": []
  };

  updateData(collectionName, newUser);
  const result = getDataByFilter(collectionName, { key: 'id', value: newUser.id });
  const expectedResult = [newUser];
  expect(result).toEqual(expectedResult);
});

test("Update data in database.", () => {
  user.permission = 'experimental';
  updateData(collectionName, user);
  const result = getDataByFilter(collectionName, { key: 'id', value: user.id });
  const expectedResult = [user];
  expect(result).toEqual(expectedResult);
});

test("Delete data in database.", () => {
  deleteData(collectionName, user);
  const result = getDataByFilter(collectionName, { key: 'id', value: user.id });
  const expectedResult = [];
  expect(result).toEqual(expectedResult);
});
