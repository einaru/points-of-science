import "dotenv/config";
import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import yaml from "js-yaml";

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
    storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
  });
  return admin.firestore();
}

const db = connectToFirebaseEmulator();
const bucket = getStorage().bucket();

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

async function uploadFiles(filePath) {
  return bucket.upload(filePath);
}

async function preprocessImage(key, obj, images) {
  if (key !== "Category" && key !== "Challenge" && key !== "Achievement") {
    return null;
  }

  if (!images) {
    return null;
  }

  if (Array.isArray(images)) {
    const promises = [];
    await obj.content.images.forEach((image) => {
      if (image.endsWith(".jpg") || image.endsWith(".png")) {
        const imagePath = `../assets/Static/images/${image}`;
        const filePath = path.resolve(here, imagePath);
        promises.push(uploadFiles(filePath));
      }
    });

    const refs = await Promise.all(promises);
    const urls = [];
    refs.forEach((ref) => {
      urls.push(ref[0].publicUrl());
    });
    return urls;
  }

  if (
    images.trim().length === 0 &&
    (!images.endsWith(".jpg") || !images.endsWith(".png"))
  ) {
    return null;
  }

  const imagePath = `../assets/Static/images/${images}`;
  const filePath = path.resolve(here, imagePath);
  const ref = await uploadFiles(filePath);
  return ref[0].publicUrl();
}

function processYaml(challenge) {
  const filePath = path.resolve(
    here,
    `../assets/Static/challenges/${challenge}`
  );
  const fileContent = fs.readFileSync(filePath);
  return yaml.load(fileContent);
}

function serializeSolution(challenge) {
  if (challenge.reflection.reflectionType === 2) {
    challenge.reflection.solution = JSON.stringify(
      challenge.reflection.solution
    );
  }

  return challenge;
}

async function populateData() {
  Object.keys(data).forEach((key) => {
    data[key].forEach((obj, index) => {
      if (key === "Challenge") {
        obj = processYaml(obj);
        obj = serializeSolution(obj);
      }

      const promises = [getData(key)];
      if (obj.content) {
        if (obj.content.images) {
          promises.push(preprocessImage(key, obj, obj.content.images));
        } else if (obj.content.image) {
          promises.push(preprocessImage(key, obj, obj.content.image));
        }
      }
      Promise.all(promises).then(([table, URL]) => {
        if (URL != null) {
          if (obj.content.images) {
            obj.content.images = URL;
          } else if (obj.content.image) {
            obj.content.image = URL;
          }
        }

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
// console.log(generateIDs());
