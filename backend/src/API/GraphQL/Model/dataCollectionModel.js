import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";

const Metadata = {
  challengeID: { type: GraphQLString },
  prevScreen: { type: GraphQLString },
  source: { type: GraphQLString },
};

const MetadataModel = new GraphQLObjectType({
  name: "MetadataModel",
  fields: () => ({
    ...Metadata,
  }),
});

const MetadataInputModel = new GraphQLInputObjectType({
  name: "MetadataInputModel",
  fields: () => ({
    ...Metadata,
  }),
});

const ClickStream = {
  event: { type: GraphQLString },
  screen: { type: GraphQLString },
  timestamp: { type: GraphQLString },
};

const ClickStreamItemModel = new GraphQLObjectType({
  name: "ClickStreamItemModel",
  fields: () => ({
    ...ClickStream,
    metadata: { type: MetadataModel },
  }),
});

const ClickStreamModel = new GraphQLObjectType({
  name: "ClickStream",
  fields: () => ({
    id: { type: GraphQLString },
    sessionToken: { type: GraphQLString },
    userID: { type: GraphQLString },
    items: { type: new GraphQLList(ClickStreamItemModel) },
  }),
});

const ClickEventInputModel = new GraphQLInputObjectType({
  name: "ClickEventInput",
  fields: () => ({
    ...ClickStream,
    metadata: { type: MetadataInputModel },
  }),
});

export { ClickStreamModel, ClickEventInputModel };
