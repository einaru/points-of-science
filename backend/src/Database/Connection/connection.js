/* eslint-disable import/no-cycle */
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import {
  connectToFirebaseProduction,
  connectToFirebaseEmulator,
  FirebaseProvider,
  JSONProvider,
} from "../../internal.js";
import config from "../../Config/config.js";

const filename = fileURLToPath(import.meta.url);
const here = dirname(filename);

let database;
let provider;
let filePathToDatabase;

function connectToDatabase() {
  const env = process.env.NODE_ENV;
  switch (env) {
    case "test":
      database = connectToNonProductionDatabase(
        config.db.test.folder,
        config.db.test.file,
        config.db.test.data
      );
      provider = JSONProvider;
      break;
    case "development":
      database = connectToFirebaseEmulator();
      provider = FirebaseProvider;
      break;
    case "production":
      database = connectToFirebaseProduction();
      provider = FirebaseProvider;
      break;
    default:
      console.error(`Error: Unexpected NODE_ENV=${env}`);
  }
}

function connectToNonProductionDatabase(
  databaseFolder,
  filePath,
  dummyDataPath
) {
  try {
    makeFolders(databaseFolder);
    filePathToDatabase = path.resolve(here, filePath);
    copyDummyDataToDatabase(dummyDataPath);
    const dummyData = JSON.parse(fs.readFileSync(filePathToDatabase, "utf-8"));
    return dummyData;
  } catch (error) {
    console.log(
      `\n[-] An error occurred in file connection.js when connecting to database. Error: ${error.message}.`
    );
  }
}

function getDatabase() {
  return database;
}

function getProvider() {
  return provider;
}

// ---------------------------------------------------- Helper-functions ------------------------------------------------------

function makeFolders(databaseFolder) {
  if (!fs.existsSync(databaseFolder)) {
    fs.mkdirSync(databaseFolder, { recursive: true });
  }
}

function copyDummyDataToDatabase(dummyDataPath) {
  const filePathToStaticData = path.resolve(here, dummyDataPath);
  if (!fs.existsSync(filePathToDatabase)) {
    const dummyData = JSON.parse(
      fs.readFileSync(filePathToStaticData, "utf-8")
    );
    fs.writeFileSync(
      filePathToDatabase,
      JSON.stringify(dummyData, null, 2),
      "utf-8"
    );
  }
}

function resetTestData(dummyDataPath) {
  const filePathToStaticData = path.resolve(here, dummyDataPath);
  const dummyData = JSON.parse(fs.readFileSync(filePathToStaticData, "utf-8"));
  database = dummyData;
  fs.writeFileSync(
    filePathToDatabase,
    JSON.stringify(dummyData, null, 2),
    "utf-8"
  );
}

export {
  connectToDatabase,
  getDatabase,
  filePathToDatabase,
  getProvider,
  resetTestData,
};
