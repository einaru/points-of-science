import { GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import {
  authenticateAccessToken,
  checkPermissionLevel,
  clickStreamCreator,
  getDataFromDatabaseByFilter,
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

const deleteClickStreamQuery = {
  type: NormalResponseModel,
  args: {
    clickStreamID: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const { user } = context;

      let response = checkPermissionLevel(config.permissionLevel.admin, user);
      if (response.type === "error") {
        return response;
      }

      const clickStreamData = await getDataFromDatabaseByFilter(
        args.clickStreamID,
        config.db.table.clickStream
      );

      if (clickStreamData == null || clickStreamData[0] == null) {
        return getResponseObject(
          "The click stream you try to delete does not exist.",
          400,
          config.responseType.error
        );
      }

      const clickStream = clickStreamCreator();
      clickStream.updateData(clickStreamData[0]);

      response = await clickStream.deleteClickStream();
      return response;
    } catch (error) {
      return error;
    }
  },
};

export { createClickStreamQuery, deleteClickStreamQuery };
