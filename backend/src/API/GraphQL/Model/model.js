import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const ResponseModel = {
  message: { type: GraphQLString },
  status: { type: GraphQLInt },
  type: { type: GraphQLString },
};

const NormalResponseModel = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    ...ResponseModel,
  }),
});

export { NormalResponseModel, ResponseModel };
