/* eslint-disable import/no-cycle */
// Server directory imports:
import { getDatabase } from "../../internal.js";

function getSnapshot(collectionName) {
  return new Promise((resolve, reject) => {
    const firebaseDB = getDatabase();
    firebaseDB
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function pushData(snapshot) {
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

function getData(collectionName) {
  return new Promise((resolve, reject) => {
    getSnapshot(collectionName)
      .then((snapshot) => {
        resolve(pushData(snapshot));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getDataByFilter(collectionName, args) {
  return new Promise((resolve, reject) => {
    const firebaseDB = getDatabase();
    firebaseDB
      .collection(collectionName)
      .where(args.key, args.operator, args.value)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return resolve(null);
        }

        return resolve(pushData(snapshot));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function storeData(collectionName, data) {
  return new Promise((resolve, reject) => {
    const firebaseDB = getDatabase();
    firebaseDB
      .collection(collectionName)
      .doc(`${data.id}`)
      .set(data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteData(collectionName, docRef) {
  return new Promise((resolve, reject) => {
    const firebaseDB = getDatabase();
    firebaseDB
      .collection(collectionName)
      .doc(`${docRef}`)
      .delete()
      .then((message) => {
        resolve(message);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updateData(collectionName, data) {
  return new Promise((resolve, reject) => {
    const firebaseDB = getDatabase();
    getDataByFilter(collectionName, {
      key: `${data.id}`,
      operator: "==",
      value: `${data.id}`,
    })
      .then((response) => {
        if (response != null) {
          return firebaseDB
            .collection(collectionName)
            .doc(`${data.id}`)
            .update(data);
        }
        return storeData(collectionName, data);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function nextID(collectionName) {
  const firebaseDB = getDatabase();
  return firebaseDB.collection(collectionName).doc().id;
}

function getFilter() {
  return {
    key: "",
    operator: "",
    value: "",
  };
}

export {
  getData,
  getDataByFilter,
  storeData,
  deleteData,
  updateData,
  nextID,
  getFilter,
};
