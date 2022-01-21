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
      config.env.ENVIRONMENT_MODE.TEST.database_file_path
    );

    return;
  }

  if (checkEnvironmentMode(config.env.ENVIRONMENT_MODE.DEVELOPMENT.mode)) {
    database = connectToNonProductionDatabase(
      config.env.ENVIRONMENT_MODE.DEVELOPMENT.database_file_path
    );

    return;
  }

  if (checkEnvironmentMode(config.env.ENVIRONMENT_MODE.PRODUCTION.mode)) {
    //Fill in logic connecting the application to a production database.
    return;
  }
}

function connectToNonProductionDatabase(filePath) {
  filePathToDatabase = path.resolve(__dirname, filePath);
  database = JSON.parse(fs.readFileSync(filePathToDatabase, "utf-8"));
  return database;
}

//---------------------------------------------------- Helper-functions ------------------------------------------------------

function checkEnvironmentMode(mode) {
  return config.env.NODE_ENV === mode;
}

export { connectToDatabase, database, filePathToDatabase };
