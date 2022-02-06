import admin from "firebase-admin";

function initializeFirebaseApp() {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
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
