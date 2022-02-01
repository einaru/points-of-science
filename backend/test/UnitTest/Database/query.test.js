import {
  config,
  connectToDatabase,
  JSONProvider,
  getDatabase,
  resetTestData,
} from "../../../src/internal.js";

let collectionName;
let nonExistingCollectionName;
let filter;
let user;
let newTable;
let database;

beforeAll(async () => {
  connectToDatabase();
  resetTestData(config.env.ENVIRONMENT_MODE.TEST.dummy_data);
  database = getDatabase();
  collectionName = config.env.USER_TABLE;
  nonExistingCollectionName = "NotATableName";
  filter = { key: "username", value: "Rayna Harteley" };
  user = await JSONProvider.getDataByFilter(collectionName, {
    key: "id",
    value: 1,
  });
  [user] = user;
  newTable = "Other_Users";
});

test("Next id for table and increment by one.", () => {
  return JSONProvider.getData(collectionName)
    .then((dataList) => {
      return Promise.all([JSONProvider.nextID(dataList), dataList]);
    })
    .then((result) => {
      const expectedResult = result[1].length + 1;
      expect(result[0]).toBe(expectedResult);
    });
});

test("Next id handle null.", () => {
  try {
    expect.assertions(1);
    JSONProvider.nextID(null);
  } catch (error) {
    const expectedResult = `Table is not an array.`;
    const result = error.message;
    expect(result).toEqual(expectedResult);
  }
});

test("Get data from database.", () => {
  return JSONProvider.getData(collectionName).then((result) => {
    const expectedResult = database[collectionName];
    expect(result).toEqual(expectedResult);
  });
});

test("Get data return null if table does not exist.", () => {
  return JSONProvider.getData(nonExistingCollectionName).then((result) => {
    const expectedResult = null;
    expect(result).toEqual(expectedResult);
  });
});

test("Get data by filter from database.", () => {
  return JSONProvider.getDataByFilter(collectionName, filter).then((result) => {
    const expectedResult = [
      {
        id: 58,
        username: "Rayna Harteley",
        password: "q6EImS",
        permission: "experimental",
        achievement: [],
        challenge: [],
        state: 1,
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});

test("Get data by filter throw error if table does not exist.", () => {
  expect.assertions(1);
  return JSONProvider.getDataByFilter(nonExistingCollectionName, filter).catch(
    (error) => {
      const expectedResult = `Attempt to filter a table which do not exist.`;
      const result = error.message;
      expect(result).toEqual(expectedResult);
    }
  );
});

test("Create data in database.", () => {
  const id = JSONProvider.nextID(database[collectionName]);
  const newUser = {
    id,
    username: "Ola Nordmann",
    password: "thisIsNOtAnActualpassWord",
    permission: "control",
    achievement: [],
    challenge: [],
  };

  return JSONProvider.updateData(collectionName, newUser)
    .then(() => {
      return JSONProvider.getDataByFilter(collectionName, {
        key: "id",
        value: newUser.id,
      });
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
    permission: "control",
    achievement: [],
    challenge: [],
  };

  return JSONProvider.updateData(newTable, newUser)
    .then(() => {
      return JSONProvider.getData(newTable);
    })
    .then((result) => {
      const expectedResult = [newUser];
      expect(result).toEqual(expectedResult);
    });
});

test("Update data in database.", () => {
  user.permission = "experimental";
  return JSONProvider.updateData(collectionName, user)
    .then(() => {
      return JSONProvider.getDataByFilter(collectionName, {
        key: "id",
        value: user.id,
      });
    })
    .then((result) => {
      const expectedResult = [user];
      expect(result).toEqual(expectedResult);
    });
});

test("Delete data in database.", () => {
  return JSONProvider.deleteData(collectionName, user)
    .then(() => {
      return JSONProvider.getDataByFilter(collectionName, {
        key: "id",
        value: user.id,
      });
    })
    .then((result) => {
      const expectedResult = [];
      expect(result).toEqual(expectedResult);
    });
});

test("Delete data returns false if table does not exist.", () => {
  return JSONProvider.deleteData(nonExistingCollectionName, user).then(
    (result) => {
      const expectedResult = false;
      expect(result).toEqual(expectedResult);
    }
  );
});
