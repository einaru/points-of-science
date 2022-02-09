import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import {
  ChallengeModel,
  ResponseModel,
  ProgressModel,
} from "../../../internal.js";

const ContentResponse = {
  title: { type: GraphQLString },
  image: { type: GraphQLString },
  description: { type: GraphQLString },
};

const ContentModel = new GraphQLObjectType({
  name: "Content",
  fields: () => ({
    id: { type: GraphQLString },
    ...ContentResponse,
  }),
});

const CategoryModel = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLString },
    challenges: { type: new GraphQLList(ChallengeModel) },
    ...ContentResponse,
    progress: { type: ProgressModel },
  }),
});

const CategoryResponseModel = new GraphQLObjectType({
  name: "CategoryResponse",
  fields: () => ({
    ...ResponseModel,
    data: { type: CategoryModel },
  }),
});

const AllCategoriesResponseModel = new GraphQLObjectType({
  name: "AllCategoriesResponse",
  fields: () => ({
    ...ResponseModel,
    data: { type: new GraphQLList(CategoryModel) },
  }),
});

const HintModel = new GraphQLObjectType({
  name: "Hint",
  fields: () => ({
    id: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

const ResourceModel = new GraphQLObjectType({
  name: "Resource",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const ActivityModel = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    id: { type: GraphQLString },
    hint: { type: new GraphQLList(HintModel) },
    resource: { type: new GraphQLList(ResourceModel) },
  }),
});

const ReflectionModel = new GraphQLObjectType({
  name: "Reflection",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    solution: { type: GraphQLString },
  }),
});

export {
  ActivityModel,
  AllCategoriesResponseModel,
  CategoryModel,
  CategoryResponseModel,
  ContentModel,
  ContentResponse,
  ReflectionModel,
};
