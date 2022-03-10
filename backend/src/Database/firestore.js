import admin from "firebase-admin";
import FirestoreProvider from "./FirestoreProvider.js";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const firestore = admin.firestore();

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
