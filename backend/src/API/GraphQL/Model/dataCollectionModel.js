import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";

const MetaData = {
  challengeID: { type: GraphQLString },
  prevScreen: { type: GraphQLString },
  source: { type: GraphQLString },
};

const MetaDataModel = new GraphQLObjectType({
  name: "MetaDataModel",
  fields: () => ({
    ...MetaData,
  }),
});

const MetaDataInputModel = new GraphQLInputObjectType({
  name: "MetaDataInputModel",
  fields: () => ({
    ...MetaData,
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
    metadata: { type: MetaDataModel },
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

const CreateClickStreamModel = new GraphQLInputObjectType({
  name: "createClickStream",
  fields: () => ({
    ...ClickStream,
    metadata: { type: MetaDataInputModel },
  }),
});

export { ClickStreamModel, CreateClickStreamModel };
