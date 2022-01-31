/* eslint-disable import/no-cycle */
import { getProvider } from "../../internal.js";

function getData(collectionName) {
  const dataProvider = getProvider();
  const data = dataProvider.getData(collectionName);
  if (isNull(data)) {
    return null;
  }

  return data;
}

function getDataByFilter(collectionName, filter) {
  const dataProvider = getProvider();
  const data = dataProvider.getDataByFilter(collectionName, filter);
  return data;
}

function deleteData(collectionName, deleteData) {
  const dataProvider = getProvider();
  const data = dataProvider.deleteData(collectionName, deleteData);
  return data;
}

function updateData(collectionName, newData) {
  const dataProvider = getProvider();
  const data = dataProvider.updateData(collectionName, newData);
  return data;
}

function nextID(table) {
  const dataProvider = getProvider();
  const data = dataProvider.nextID(table);
  return data;
}

// -------------------------------------------------- Helper-functions ----------------------------------------------------

function isNull(data) {
  return data == null;
}

export { getData, getDataByFilter, deleteData, updateData, nextID };
