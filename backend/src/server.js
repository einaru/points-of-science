import "dotenv/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import config from "./Config/config.js";
import { schema, pubsub } from "./internal.js";
import authMiddleware from "./Authorization/authMiddleware.js";
import { providers } from "./Database/firestore.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(authMiddleware);

app.get("/graphiql", (req, res, next) => {
  if (config.env !== "development") {
    next();
  } else {
    const fileName = fileURLToPath(import.meta.url);
    const here = dirname(fileName);
    res.sendFile(path.resolve(here, "../graphiql-over-ws.html"));
  }
});

app.use(
  "/graphql",
  graphqlHTTP((req, res, params) => {
    return {
      schema,
      graphiql: true,
      context: {
        user: req.user,
        providers,
        pubsub,
      },
    };
  })
);

// Provide feedback on missing secret keys
Object.entries(config.secret).forEach(([key, value]) => {
  if (!value) {
    console.error(`Error: Secret key for ${key} is not set!`);
  }
});

const server = createServer(app);
server.listen(config.port);

const wsServer = new WebSocketServer({
  server,
  path: "/graphql",
});

server.on("listening", () => {
  useServer({ schema }, wsServer);
  console.log(`Running in "${config.env}" mode`);
  console.log(`Server listening on port ${config.port}`);
});
