/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-cycle */
import fs from "fs";
import { getDatabase, filePathToDatabase } from "../../internal.js";

const incrementor = 1;

function getData(collectionName) {
  return new Promise((resolve, reject) => {
    try {
      const database = getDatabase();
      const data = database[collectionName];
      if (isNull(data)) {
        return resolve(null);
      }

      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

function getDataByFilter(collectionName, filter) {
  return new Promise((resolve, reject) => {
    getData(collectionName)
      .then((data) => {
        if (isNull(data)) {
          return reject(
            new Error(`Attempt to filter a table which do not exist.`)
          );
        }
        const filteredData = data.filter((entry) => {
          if (!isNull(entry[filter.key])) {
            return entry[filter.key] === filter.value;
          }
        });

        return resolve(filteredData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteData(collectionName, deleteData) {
  return new Promise((resolve, reject) => {
    mutateData(collectionName, deleteData, performDelete)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updateData(collectionName, newData) {
  return new Promise((resolve, reject) => {
    mutateData(collectionName, newData, performUpdate)
      .then((hasUpdated) => {
        if (!hasUpdated) {
          performCreate(getDatabase(), collectionName, newData);
          writeData();
        }

        resolve(hasUpdated);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function mutateData(collectionName, findData, mutateFunction) {
  return new Promise((resolve, reject) => {
    getData(collectionName)
      .then((data) => {
        if (isNull(data)) {
          return resolve(false);
        }

        const entryFound = getPosition(findData, data);
        if (entryFound === -1) {
          return resolve(false);
        }

        mutateFunction(getDatabase(), collectionName, entryFound, findData);
        writeData();
        return resolve(true);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

function nextID(table) {
  if (isNull(table) || !Array.isArray(table)) {
    throw new Error(`Table is not an array.`);
  }

  if (table.length === 0) {
    return resolve(1);
  }

  return table[table.length - 1].id + incrementor;
}

// -------------------------------------------------- Helper-functions ----------------------------------------------------

function performCreate(database, key, newData) {
  if (database[key]) {
    database[key].push(newData);
  } else {
    database[key] = [];
    database[key].push(newData);
  }
}

function performUpdate(database, key, position, newEntry) {
  database[key][position] = newEntry;
}

function performDelete(database, key, position, deleteEntry) {
  database[key].splice(position, 1);
}

function writeData() {
  fs.writeFileSync(
    filePathToDatabase,
    JSON.stringify(getDatabase(), null, 2),
    "utf-8"
  );
}

function isNull(data) {
  return data == null;
}

function hasDataEntry(data, entry) {
  if (Array.isArray(entry)) {
    return entry.includes(data);
  }
  if (entry === Object(entry)) {
    return data.id === entry.id;
  }
  if (data === entry) {
    return true;
  }

  return false;
}

function getPosition(data, list) {
  let position = -1;
  list.find((entry, index) => {
    if (hasDataEntry(data, entry)) {
      position = index;
      return true;
    }
  });

  return position;
}

function getFilter() {
  return {
    key: "",
    value: "",
  };
}

export { getData, getDataByFilter, deleteData, updateData, nextID, getFilter };
