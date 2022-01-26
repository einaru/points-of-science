import fs from "fs";
import { getDatabase, filePathToDatabase } from "../../internal.js";

const incrementor = 1;

function getData(collectionName) {
  const database = getDatabase();
  const data = database[collectionName];
  if (isNull(data)) {
    return null;
  }

  return data;
}

function getDataByFilter(collectionName, filter) {
  try {
    const data = getData(collectionName);
    if (isNull(data)) {
      throw new Error(`Attempt to filter a table which do not exist.`);
    }
    const filteredData = data.filter((entry) => {
      if (!isNull(entry[filter.key])) {
        return entry[filter.key] == filter.value;
      }
    });

    return filteredData;
  } catch (error) {
    reThrowError(error);
  }
}

function deleteData(collectionName, deleteData) {
  try {
    return mutateData(collectionName, deleteData, performDelete);
  } catch (error) {
    reThrowError(error);
  }
}

function updateData(collectionName, newData) {
  try {
    const hasUpdated = mutateData(collectionName, newData, performUpdate);
    if (!hasUpdated) {
      performCreate(getDatabase(), collectionName, newData);
      writeData();
    }

    return hasUpdated;
  } catch (error) {
    reThrowError(error);
  }
}

function mutateData(collectionName, findData, mutateFunction) {
  try {
    const data = getData(collectionName);
    if (isNull(data)) {
      return false;
    }

    const entryFound = getPosition(findData, data);
    if (entryFound == -1) {
      return false;
    }

    mutateFunction(getDatabase(), collectionName, entryFound, findData);
    writeData();
    return true;
  } catch (error) {
    reThrowError(error);
  }
}

function nextID(table) {
  if (isNull(table) || !Array.isArray(table)) {
    throw new Error(`Table is not an array.`);
  }

  return table.length + incrementor;
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
    return data.id == entry.id;
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

function reThrowError(error) {
  throw error;
}

export { getData, getDataByFilter, deleteData, updateData, nextID };
