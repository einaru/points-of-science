import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import config from "./Config/config.js";
import { schema, connectToDatabase } from "./internal.js";
import authMiddleware from "./Authorization/authMiddleware.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(authMiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use((error, request, response, next) => {
  if (error) {
    return response.status(500).send(error);
  }
  next();
});

// Provide feedback on missing secret keys
Object.entries(config.secret).forEach(([key, value]) => {
  if (!value) {
    console.error(`Error: Secret key for ${key} is not set!`);
  }
});

connectToDatabase();

app.listen(config.port, () => {
  console.log(`Running in "${config.env}" mode`);
  console.log(`Server listening on port ${config.port}`);
});
