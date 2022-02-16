import { GraphQLString, GraphQLList } from "graphql";
import {
  clickStreamCreator,
  getData,
  getDataFromDatabaseByFilter,
  nextID,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";
import { UserInputError } from "../error.js";
import { NormalResponseModel } from "../Model/model.js";
import {
  ClickStreamModel,
  CreateClickStreamModel,
} from "../Model/dataCollectionModel.js";

// Root Queries - Used to retrieve data with GET-Requests
const getAllClickStreamsQuery = {
  type: new GraphQLList(ClickStreamModel),
  args: {},
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const clickStreamsData = await getData(config.db.table.clickStream);
    let clickStreams = [];
    clickStreamsData.forEach((clickStreamData) => {
      const clickStream = clickStreamCreator();
      clickStreams.push(
        clickStream.restoreObject(clickStream, clickStreamData)
      );
    });

    clickStreams = await Promise.all(clickStreams);
    return clickStreams;
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const createClickStreamQuery = {
  type: ClickStreamModel,
  args: {
    sessionToken: { type: GraphQLString },
    clicks: { type: new GraphQLList(CreateClickStreamModel) },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);

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
      data.userID = context.user.id;
      clickStream.updateData(data);
    } else {
      [data] = clickStreamData;
      clickStream.updateData(data);
      args.clicks.forEach((click) => {
        clickStream.addClickNode(click);
      });
    }
    const response = await clickStream.saveData(
      "clickStream",
      clickStream,
      config.db.table.clickStream,
      "Click stream stored successfully."
    );
    return response;
  },
};

const deleteClickStreamQuery = {
  type: NormalResponseModel,
  args: {
    clickStreamID: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const clickStreamData = await getDataFromDatabaseByFilter(
      "id",
      args.clickStreamID,
      config.db.table.clickStream
    );

    if (clickStreamData == null || clickStreamData[0] == null) {
      throw new UserInputError(
        "The click stream you try to delete does not exist."
      );
    }

    const clickStream = clickStreamCreator();
    clickStream.updateData(clickStreamData[0]);

    const message = await clickStream.deleteClickStream();
    return { message };
  },
};

export {
  createClickStreamQuery,
  deleteClickStreamQuery,
  getAllClickStreamsQuery,
};
