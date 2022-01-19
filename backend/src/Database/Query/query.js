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
  if(isNull(collectionName)){
    return [];
  }

  return data;
}

function getDataByFilter(collectionName, filter){
  console.log(filter);
  const data = getData(collectionName);
  const filteredData = data.filter((entry) => {
    if(!isNull(entry[filter.key])){
      return entry[filter.key] == filter.value;
    }
  });

  return filteredData;
}

function deleteData(collectionName, deleteData){
  mutateData(collectionName, deleteData, performDelete);
}

function updateData(collectionName, newData){
  const hasUpdated = mutateData(collectionName, newData, performUpdate);
  if(!hasUpdated){
    performCreate(database, collectionName, newData);
    writeData();
  }
}

function mutateData(collectionName, findData, mutateFunction){
  console.log(findData);
  const data = getData(collectionName);
  const entryFound = getPosition(findData, data);
  if(entryFound > -1){
    mutateFunction(database, collectionName, entryFound, findData);
    writeData();
    return true;
  }

  return false;
}

function findLatestID(collectionName){
  const data = getData(collectionName);
  return data.length + incrementor;
}


//-------------------------------------------------- Helper-functions ----------------------------------------------------

function performCreate(database, key, newData){
  database[key].push(newData);
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
  findLatestID
}
