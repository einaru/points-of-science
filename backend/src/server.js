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

function sortSubscriptionOnUser(subscribeTokens, userID) {
  return new Promise((resolve, reject) => {
    try {
      resolve(subscribeTokens.filter((token) => token.userID === userID));
    } catch (error) {
      reject(error);
    }
  });
}

function tokensToDelete(subscribeTokens, userID) {
  return new Promise((resolve, reject) => {
    sortSubscriptionOnUser(subscribeTokens, userID)
      .then((userTokens) => {
        let newest = 0;
        userTokens.forEach((token, index) => {
          if (index === 0) {
            newest = index;
          } else if (
            Number(token.created) > Number(userTokens[newest].created)
          ) {
            newest = index;
          }
        });

        userTokens.splice(newest, 1);
        resolve(userTokens);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

setInterval(() => {
  return new Promise((resolve, reject) => {
    providers.subscribeTokens
      .getAll()
      .then((subscribeTokens) => {
        const userIDs = subscribeTokens.map((item) => item.userID);
        const subscribedUsers = new Set(userIDs);
        const promises = [];
        subscribedUsers.forEach((userID) => {
          promises.push(tokensToDelete(subscribeTokens, userID));
        });

        return Promise.all(promises);
      })
      .then((deleteTokens) => {
        deleteTokens.forEach((tokenList) => {
          tokenList.forEach((token) => {
            providers.subscribeTokens
              .delete(token.id)
              .then(() => {
                console.log("Expired subscribe token deleted.");
              })
              .catch((error) => {
                console.log("Failed to delete expired subscribe token.");
              });
          });
        });
        resolve();
      })
      .catch((error) => {
        console.log(
          "Error occurred when deleting subscribe token.",
          error.message
        );
        reject();
      });
  });
}, 1800000);
