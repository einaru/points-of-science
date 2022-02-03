/* eslint-disable import/no-cycle */
import { getProvider } from "../../internal.js";

function getData(collectionName) {
  const dataProvider = getProvider();
  return dataProvider.getData(collectionName);
}

function getDataByFilter(collectionName, filter) {
  const dataProvider = getProvider();
  return dataProvider.getDataByFilter(collectionName, filter);
}

function deleteData(collectionName, deleteData) {
  const dataProvider = getProvider();
  return dataProvider.deleteData(collectionName, deleteData);
}

function updateData(collectionName, newData) {
  const dataProvider = getProvider();
  return dataProvider.updateData(collectionName, newData);
}

function nextID(table) {
  const dataProvider = getProvider();
  return dataProvider.nextID(table);
}

function getFilter(args) {
  const dataProvider = getProvider();
  const filter = dataProvider.getFilter();
  if (filter.key && filter.operator && filter.value) {
    filter.key = args.key;
    filter.operator = args.operator;
    filter.value = args.value;
    return filter;
  }

  filter.key = args.key;
  filter.value = args.value;
  return filter;
}

// -------------------------------------------------- Helper-functions ----------------------------------------------------

// --------------------------------------------------    Exports    --------------------------------------------------------

export { getData, getDataByFilter, deleteData, updateData, nextID, getFilter };
