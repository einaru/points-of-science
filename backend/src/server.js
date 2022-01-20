import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import { config, schema } from './internal.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
}));

app.use((error, request, response, next) => {
  if(error){
    return response.status(500).send(error);
  }

  next();
});

app.listen(5000, () => console.log(`[*] Server listening at port ${5000} \n`));
