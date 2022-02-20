import { GraphQLString, GraphQLList } from "graphql";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";
import { ApiError, UserInputError } from "../error.js";
import { NormalResponseModel } from "../Model/model.js";
import {
  ClickEventInputModel,
  ClickStreamModel,
} from "../Model/dataCollectionModel.js";
import ClickStream from "../../../DataCollection/ClickStream.js";

export const getAllClickStreams = {
  type: new GraphQLList(ClickStreamModel),
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);
    await providers.clickStreams.getAll();
  },
};

async function getClickStream(userID, sessionToken, provider) {
  const data = await provider.getByID(sessionToken);
  if (data) {
    return ClickStream.fromData(data);
  }
  return new ClickStream(userID, sessionToken);
}

function serialize(cls) {
  return JSON.parse(JSON.stringify(cls));
}

export const logEvent = {
  type: ClickStreamModel,
  args: {
    sessionToken: { type: GraphQLString },
    event: { type: ClickEventInputModel },
  },
  async resolve(_, { sessionToken, event }, { user, providers }) {
    assertIsAuthenticated(user);
    if (!(await providers.refreshTokens.getByID(sessionToken))) {
      throw new ApiError("Invalid session token");
    }

    const clickStream = await getClickStream(
      user.id,
      sessionToken,
      providers.clickStreams
    );
    clickStream.addClickEvent(event);

    const data = serialize(clickStream);
    await providers.clickStreams.set(sessionToken, data);
  },
};

export const deleteClickStream = {
  type: NormalResponseModel,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(_, { id }, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);

    try {
      await providers.clickStreams.delete(id);
      return { message: "Click stream deleted." };
    } catch (error) {
      const message = `Error deleting click stream with ID = ${id}`;
      console.error(message);
      console.error(error);
      throw new UserInputError(message);
    }
  },
};
