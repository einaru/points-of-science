import { GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import {
  authenticateAccessToken,
  clickStreamCreator,
  nextID,
  CreateClickStreamModel,
  NormalResponseModel,
} from "../../../internal.js";
import config from "../../../Config/config.js";

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

// Root Queries - Used to retrieve data with GET-Requests

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const createClickStreamQuery = {
  type: NormalResponseModel,
  args: {
    clicks: { type: new GraphQLList(CreateClickStreamModel) },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const { user } = context;

      const id = nextID(config.db.table.clickStream);
      const data = args;
      data.id = id;
      data.userID = user.id;

      const clickStream = clickStreamCreator();
      clickStream.updateData(data);

      const response = await clickStream.saveData(
        "clickStream",
        clickStream,
        config.db.table.clickStream,
        "Click stream stored successfully."
      );

      return response;
    } catch (error) {
      return error;
    }
  },
};

export { createClickStreamQuery };
