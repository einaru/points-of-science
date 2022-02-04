import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const ClickStreamItemModel = new GraphQLObjectType({
  name: "ClickStreamItemModel",
  fields: () => ({
    id: { type: GraphQLInt },
    screenID: { type: GraphQLInt },
    timestamp: { type: GraphQLString },
    nextItem: { type: ClickStreamItemModel },
    prevItem: { type: ClickStreamItemModel },
  }),
});

const ClickStreamModel = new GraphQLObjectType({
  name: "ClickStream",
  fields: () => ({
    id: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    clickStreamItem: { type: ClickStreamItemModel },
  }),
});

export { ClickStreamModel };
