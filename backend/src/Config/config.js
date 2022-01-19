import { config } from 'dotenv-yaml';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if(process.env.NODE_ENV === 'production'){
  console.log("[*] This application runs in production mode.");
  config({ path: path.resolve(__dirname, `../../app.yaml`) });
  console.log(path.resolve(__dirname, `../../app.yaml` ));
} else {
  console.log("[*] This application runs in development mode.");
  config({ path: path.resolve(__dirname, `../../${process.env.NODE_ENV.trim()}.yaml`) });
  console.log(path.resolve(__dirname, `../../${process.env.NODE_ENV.trim()}.yaml` ));
}

const env =  {
  NODE_ENV: process.env.NODE_ENV,
  HTTPPort: process.env.HTTPPORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  FORGOTTEN_PASSWORD_SECRET: process.env.FORGOTTEN_PASSWORD_SECRET,
  REFRESH_TOKEN_TABLE: process.env.REFRESH_TOKEN_TABLE,
  USER_TABLE: process.env.USER_TABLE,
  RESPONSE_TYPE: {
    success: 'success',
    error: 'error'
  }
}

export { env };
