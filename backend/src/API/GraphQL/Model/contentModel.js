import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from "graphql";
import { ChallengeModel, ProgressModel } from "../../../internal.js";

const ContentResponse = {
  name: { type: GraphQLString },
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

const ActivityTypeEnum = new GraphQLEnumType({
  name: "ActivityType",
  values: {
    external: { value: 1 },
    inApp: { value: 2 },
  },
});

const resource = {
  title: { type: GraphQLString },
  url: { type: GraphQLString },
};

const ResourceType = new GraphQLObjectType({
  name: "Resource",
  fields: () => ({
    ...resource,
  }),
});

const ResourceInputType = new GraphQLInputObjectType({
  name: "ResourceInput",
  fields: () => ({
    ...resource,
  }),
});

const activity = {
  type: { type: ActivityTypeEnum },
  description: { type: GraphQLString },
  hints: { type: new GraphQLList(GraphQLString) },
};

const ActivityModel = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    id: { type: GraphQLString },
    ...activity,
    resources: { type: new GraphQLList(ResourceType) },
  }),
});

const ActivityInputModel = new GraphQLInputObjectType({
  name: "ActivityInput",
  fields: () => ({
    ...activity,
    resources: { type: new GraphQLList(ResourceInputType) },
  }),
});

const ReflectionTypeEnum = new GraphQLEnumType({
  name: "ReflectionType",
  values: {
    reflection: { value: 1 },
    argument: { value: 2 },
  },
});

const reflectionData = {
  title: { type: GraphQLString },
  solution: { type: GraphQLString },
  reflectionType: { type: ReflectionTypeEnum },
};

const ReflectionModel = new GraphQLObjectType({
  name: "Reflection",
  fields: () => ({
    id: { type: GraphQLString },
    ...reflectionData,
    choices: { type: new GraphQLList(GraphQLString) },
  }),
});

const ReflectionInputModel = new GraphQLInputObjectType({
  name: "ReflectionInput",
  fields: () => ({
    ...reflectionData,
    reflectionType: { type: ReflectionTypeEnum },
    choices: { type: new GraphQLList(GraphQLString) },
  }),
});

export {
  ActivityInputModel,
  ActivityModel,
  CategoryModel,
  ContentModel,
  ContentResponse,
  ReflectionModel,
  ReflectionInputModel,
  ReflectionTypeEnum,
};
