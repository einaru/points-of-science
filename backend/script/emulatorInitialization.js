import "dotenv/config";
import admin from "firebase-admin";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const filename = fileURLToPath(import.meta.url);
const here = dirname(filename);

const filePathToDatabase = path.resolve(
  here,
  "../assets/Static/dummy_data.json"
);

const data = JSON.parse(fs.readFileSync(filePathToDatabase, "utf-8"));

function connectToFirebaseEmulator() {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
  return admin.firestore();
}

const db = connectToFirebaseEmulator();

function getSnapshot(collectionName) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
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
  const list = [];
  snapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
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

function storeData(collectionName, obj) {
  return new Promise((resolve, reject) => {
    let ref;
    if (Number.isInteger(obj.id) || !obj.id) {
      ref = db.collection(collectionName).doc();
      obj.id = ref.id;
    } else {
      ref = db.collection(collectionName).doc(`${obj.id}`);
    }
    ref
      .set(obj)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getDataByFilter(collectionName, args) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
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

function updateData(collectionName, obj) {
  return new Promise((resolve, reject) => {
    getDataByFilter(collectionName, {
      key: `${obj.id}`,
      operator: "==",
      value: `${obj.id}`,
    })
      .then((response) => {
        if (response != null) {
          return db.collection(collectionName).doc(`${obj.id}`).update(obj);
        }
        return storeData(collectionName, obj);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function addData(collectionName, save) {
  return new Promise((resolve, reject) => {
    updateData(collectionName, save)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function populateData() {
  Object.keys(data).forEach((key) => {
    data[key].forEach((obj) => {
      getData(key).then((table) => {
        if (table.length === 0) {
          addData(key, obj)
            .then((docRef) => {
              console.log("Document written with ID: ", docRef);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
      });
    });
  });
}

function generateIDs() {
  return {
    CategoryID: db.collection("Category").doc().id,
    ChallengeID: db.collection("Challenge").doc().id,
    CategoryContentID: db.collection("Content").doc().id,
    ChallengeContentID: db.collection("Content").doc().id,
    ReflectionID: db.collection("Reflection").doc().id,
    RewardID: db.collection("Reward").doc().id,
    ActivityID: db.collection("Activity").doc().id,
  };
}

populateData();
console.log(generateIDs());
