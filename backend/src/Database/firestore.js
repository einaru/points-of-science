import admin from "firebase-admin";
import FirestoreProvider from "./FirestoreProvider.js";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const firestore = admin.firestore();

export const providers = {
  categories: new FirestoreProvider(firestore, "Category"),
  challenges: new FirestoreProvider(firestore, "Challenge"),
  clickStreams: new FirestoreProvider(firestore, "ClickStream"),
  refreshTokens: new FirestoreProvider(firestore, "RefreshToken"),
  users: new FirestoreProvider(firestore, "User"),
  validUsernames: new FirestoreProvider(firestore, "ValidUsername"),
};
