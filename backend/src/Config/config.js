import dotenv from 'dotenv';

dotenv.config({ path: 'backend_js/app.yaml' });

const env =  {
    HTTPPort: process.env.HTTPPORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    FORGOTTEN_PASSWORD_SECRET: process.env.FORGOTTEN_PASSWORD_SECRET
}

export { env };
