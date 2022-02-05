import fs from "fs";
import admin from "firebase-admin";
import config from "../../Config/config.js";

const filePathToFirebaseSDK = config.firebase.serviceAccountKey;

const serviceAccount = JSON.parse(
  fs.readFileSync(filePathToFirebaseSDK, "utf-8")
);

function initializeFirebaseApp() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

function connectToFirebaseProduction() {
  initializeFirebaseApp();
  return admin.firestore();
}

function connectToFirebaseEmulator() {
  admin.initializeApp({
    projectId: "msc-scienceapp",
  });
  return admin.firestore();
}

export { connectToFirebaseEmulator, connectToFirebaseProduction };
