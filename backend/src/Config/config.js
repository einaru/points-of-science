import { config } from "dotenv-yaml";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  console.log("[*] This application runs in production mode.");
  config({ path: path.resolve(__dirname, `../../app.yaml`) });
  console.log(path.resolve(__dirname, `../../app.yaml`));
} else if (process.env.NODE_ENV === "test") {
  console.log("[*] This application runs in test mode.");
  config({ path: path.resolve(__dirname, `../../test.yaml`) });
  console.log(path.resolve(__dirname, `../../test.yaml`));
} else {
  console.log("[*] This application runs in development mode.");
  config({ path: path.resolve(__dirname, `../../development.yaml`) });
  console.log(path.resolve(__dirname, `../../development.yaml`));
}

const env = {
  NODE_ENV: process.env.NODE_ENV,
  ENVIRONMENT_MODE: {
    PRODUCTION: {
      mode: "production",
      database_file_path: "",
      database_folder: "",
    },
    DEVELOPMENT: {
      mode: "development",
      database_file_path:
        "../../../assets/Database/Development/dummy_data.json",
      database_folder: "./assets/Database/Development",
      dummy_data: "../../../assets/Static/dummy_data.json",
    },
    TEST: {
      mode: "test",
      database_file_path: "../../../assets/Database/Test/dummy_data.json",
      database_folder: "./assets/Database/Test",
      dummy_data: "../../../assets/Static/dummy_data.json",
    },
  },
  HTTPPORT: process.env.HTTPPORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  FORGOTTEN_PASSWORD_SECRET: process.env.FORGOTTEN_PASSWORD_SECRET,
  REFRESH_TOKEN_TABLE: process.env.REFRESH_TOKEN_TABLE,
  USER_TABLE: process.env.USER_TABLE,
  RESPONSE_TYPE: {
    success: "success",
    error: "error",
  },
};

export { env };
