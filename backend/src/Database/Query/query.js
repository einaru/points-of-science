import { config, filePathToDatabase } from '../../internal.js';
import fs from 'fs';

let database = null;
const incrementor = 1;

if(config.env.NODE_ENV === "development"){
  console.log("[*] Connecting to development database.");
  database = JSON.parse(fs.readFileSync(filePathToDatabase, 'utf-8'));
}

if(config.env.NODE_ENV === "production"){
  console.log("[*] Connecting to production database.");
}

function getData(collectionName){
  const data = database[collectionName];
  if(isNull(data)){
    return null;
  }

  return data;
}

function getDataByFilter(collectionName, filter){
  try{
    const data = getData(collectionName);
    if(isNull(data)){
      throw new Error(`Attempt to filter a table which do not exist.`);
    }
    const filteredData = data.filter((entry) => {
      if(!isNull(entry[filter.key])){
        return entry[filter.key] == filter.value;
      }
    });

    return filteredData;
  } catch(error){
    reThrowError(error);
  }
}

function deleteData(collectionName, deleteData){
  try{
    return mutateData(collectionName, deleteData, performDelete);
  } catch(error){
    reThrowError(error);
  }
}

function updateData(collectionName, newData){
  try{
    const hasUpdated = mutateData(collectionName, newData, performUpdate);
    if(!hasUpdated){
      performCreate(database, collectionName, newData);
      writeData();
    }

    return hasUpdated;
  } catch(error){
    reThrowError(error);
  }
}

function mutateData(collectionName, findData, mutateFunction){
  try{
    const data = getData(collectionName);
    if(isNull(data)){
      return false;
    }

    const entryFound = getPosition(findData, data);
    if(entryFound == -1){
      return false;
    }

    mutateFunction(database, collectionName, entryFound, findData);
    writeData();
    return true;
  } catch(error){
    reThrowError(error);
  }
}

function nextID(table){
  if(isNull(table) || !Array.isArray(table)){
    throw new Error(`Table is not an array.`);
  }

  return table.length + incrementor;
}


//-------------------------------------------------- Helper-functions ----------------------------------------------------

function performCreate(database, key, newData){
  if(database[key]){
    database[key].push(newData);
  } else {
    database[key] = [];
    database[key].push(newData);
  }
}

function performUpdate(database, key, position, newEntry){
  const tempOldEntry = database[key][position];
  database[key][position] = newEntry;
  printUpdate(tempOldEntry, database[key][position]);
}

function performDelete(database, key, position, deleteEntry){
  const tempOldEntry = database[key][position];
  database[key].splice(position, 1);
  printUpdate(tempOldEntry, database[key][position]);
}

function writeData(){
  fs.writeFileSync(filePathToDatabase, JSON.stringify(database, null, 2), 'utf-8');
  console.log("[+] Data successfully written to file.");
}

function isNull(data){
  return (data == null);
}

function hasLength(list){
  return (list.length > 0);
}

function findDataEntry(data, list){
  const entryFound = list.find((entry) => {
    return hasDataEntry(data, entry);
  });

  return entryFound;
}

function hasDataEntry(data, entry){
  if(Array.isArray(entry)){
    return entry.includes(data);
  } else if(entry === Object(entry)){
    return data.id == entry.id;
  }

  return false;
}

function getPosition(data, list){
  let position = -1;
  list.find((entry, index) => {
    if(hasDataEntry(data, entry)){
      position = index;
      return true;
    }
  });

  return position;
}

function reThrowError(error){
  throw error;
}

function printUpdate(oldEntry, newEntry){
  /*console.log(`[*] Updated from: ${oldEntry} ==> ${newEntry}`);
  console.log(oldEntry);
  console.log(newEntry);*/
}

export {
  getData,
  getDataByFilter,
  deleteData,
  updateData,
  nextID,
}
