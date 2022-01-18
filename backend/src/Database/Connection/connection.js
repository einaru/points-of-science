import { config } from '../../internal.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let filePathToDatabase = "";

if(config.env.NODE_ENV === "development"){
  filePathToDatabase = path.resolve(__dirname, '../dummy_data.json');
}

if(config.env.NODE_ENV === "production"){
  //Fill in logic connecting the application to a production database.
}

export {
  filePathToDatabase
}
