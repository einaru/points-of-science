import { config } from "../../internal.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let database;
let filePathToDatabase;

function connectToDatabase() {
  if (checkEnvironmentMode(config.env.ENVIRONMENT_MODE.TEST.mode)) {
    database = connectToNonProductionDatabase(
      config.env.ENVIRONMENT_MODE.TEST.database_folder,
      config.env.ENVIRONMENT_MODE.TEST.database_file_path,
      config.env.ENVIRONMENT_MODE.TEST.dummy_data
    );

    return;
  }

  if (checkEnvironmentMode(config.env.ENVIRONMENT_MODE.DEVELOPMENT.mode)) {
    database = connectToNonProductionDatabase(
      config.env.ENVIRONMENT_MODE.DEVELOPMENT.database_folder,
      config.env.ENVIRONMENT_MODE.DEVELOPMENT.database_file_path,
      config.env.ENVIRONMENT_MODE.TEST.dummy_data
    );

    return;
  }

  if (checkEnvironmentMode(config.env.ENVIRONMENT_MODE.PRODUCTION.mode)) {
    //Fill in logic connecting the application to a production database.
    return;
  }
}

function connectToNonProductionDatabase(databaseFolder, filePath, dummyDataPath) {
  try{
    makeFolders(databaseFolder);
    filePathToDatabase = path.resolve(__dirname, filePath);
    copyDummyDataToDatabase(dummyDataPath);
    database = JSON.parse(fs.readFileSync(filePathToDatabase, "utf-8"));
    return database;
  } catch(error){
    console.log(`\n[-] An error occurred in file connection.js when connecting to database. Error: ${error.message}.`);
  }
}

//---------------------------------------------------- Helper-functions ------------------------------------------------------

function checkEnvironmentMode(mode) {
  return config.env.NODE_ENV === mode;
}

function makeFolders(databaseFolder){
  if(!fs.existsSync(databaseFolder)){
    fs.mkdirSync(databaseFolder, { recursive: true });
  }
}

function copyDummyDataToDatabase(dummyDataPath){
  const filePathToStaticData = path.resolve(__dirname, dummyDataPath);
  if(!fs.existsSync(filePathToDatabase)){
    const dummyData = JSON.parse(fs.readFileSync(filePathToStaticData, "utf-8"));
    fs.writeFileSync(
      filePathToDatabase,
      JSON.stringify(dummyData, null, 2),
      "utf-8"
    );
  }
}

export { connectToDatabase, database, filePathToDatabase };
