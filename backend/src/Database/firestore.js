import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import FirestoreProvider from "./FirestoreProvider.js";
import config from "../Config/config.js";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: config.storage.bucket,
});

export const firestore = admin.firestore();
export const bucket = getStorage().bucket();

export const providers = {
  achievements: new FirestoreProvider(firestore, "Achievement"),
  categories: new FirestoreProvider(firestore, "Category"),
  challenges: new FirestoreProvider(firestore, "Challenge"),
  clickStreams: new FirestoreProvider(firestore, "ClickStream"),
  contacts: new FirestoreProvider(firestore, "Contact"),
  refreshTokens: new FirestoreProvider(firestore, "RefreshToken"),
  smileOMeters: new FirestoreProvider(firestore, "SmileOMeter"),
  subscribeTokens: new FirestoreProvider(firestore, "SubscribeToken"),
  users: new FirestoreProvider(firestore, "User"),
  validUsernames: new FirestoreProvider(firestore, "ValidUsername"),
};
