import admin from "firebase-admin";
import FirestoreProvider from "./FirestoreProvider.js";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const firestore = admin.firestore();

export const providers = {
  clickStreams: new FirestoreProvider(firestore, "ClickStream"),
  refreshTokens: new FirestoreProvider(firestore, "RefreshToken"),
};