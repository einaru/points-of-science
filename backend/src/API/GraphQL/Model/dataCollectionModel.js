import { GraphQLObjectType, GraphQLString } from "graphql";

const ClickStreamItemModel = new GraphQLObjectType({
  name: "ClickStreamItemModel",
  fields: () => ({
    id: { type: GraphQLString },
    screenID: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    nextItem: { type: ClickStreamItemModel },
    prevItem: { type: ClickStreamItemModel },
  }),
});

const ClickStreamModel = new GraphQLObjectType({
  name: "ClickStream",
  fields: () => ({
    id: { type: GraphQLString },
    userID: { type: GraphQLString },
    clickStreamItem: { type: ClickStreamItemModel },
  }),
});

export { ClickStreamModel };
