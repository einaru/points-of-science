import { GraphQLString, GraphQLList } from "graphql";
import {
  authenticateAccessToken,
  checkPermissionLevel,
  clickStreamCreator,
  getData,
  getDataFromDatabaseByFilter,
  nextID,
  AllClickStreamsResponseModel,
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
const getAllClickStreamsQuery = {
  type: AllClickStreamsResponseModel,
  args: {},
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);

      let response = checkPermissionLevel(
        config.permissionLevel.admin,
        context.user
      );
      if (response.type === "error") {
        return response;
      }

      const clickStreamsData = await getData(config.db.table.clickStream);
      let clickStreams = [];
      clickStreamsData.forEach((clickStreamData) => {
        const clickStream = clickStreamCreator();
        clickStreams.push(
          clickStream.restoreObject(clickStream, clickStreamData)
        );
      });

      response = getResponseObject(
        "Click streams retrieved successfully",
        200,
        config.responseType.success
      );

      clickStreams = await Promise.all(clickStreams);
      response.data = clickStreams;
      return response;
    } catch (error) {
      return error;
    }
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const createClickStreamQuery = {
  type: NormalResponseModel,
  args: {
    sessionToken: { type: GraphQLString },
    clicks: { type: new GraphQLList(CreateClickStreamModel) },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const { user } = context;

      const refreshToken = await getDataFromDatabaseByFilter(
        "id",
        args.sessionToken,
        config.db.table.refreshToken
      );

      if (refreshToken == null) {
        throw new Error("Session token is not valid.");
      }

      const clickStreamData = await getDataFromDatabaseByFilter(
        "sessionToken",
        args.sessionToken,
        config.db.table.clickStream
      );

      let id;
      let data;
      const clickStream = clickStreamCreator();
      if (clickStreamData == null) {
        id = nextID(config.db.table.clickStream);
        data = args;
        data.id = id;
        data.userID = user.id;
        clickStream.updateData(data);
      } else {
        [data] = clickStreamData;
        clickStream.updateData(data);
        args.clicks.forEach((click) => {
          clickStream.addClickNode(click);
        });
      }

      return await clickStream.saveData(
        "clickStream",
        clickStream,
        config.db.table.clickStream,
        "Click stream stored successfully."
      );
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
        "id",
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

export {
  createClickStreamQuery,
  deleteClickStreamQuery,
  getAllClickStreamsQuery,
};
