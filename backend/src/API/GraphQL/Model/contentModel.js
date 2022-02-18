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

const ActivityTypeEnum = new GraphQLEnumType({
  name: "ActivityType",
  values: {
    external: { value: 1 },
    inApp: { value: 2 },
  },
});

const Activity = {
  type: { type: ActivityTypeEnum },
  description: { type: GraphQLString },
  hints: { type: new GraphQLList(GraphQLString) },
  resources: { type: new GraphQLList(GraphQLString) },
};

const ActivityModel = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    id: { type: GraphQLString },
    ...Activity,
  }),
});

const ActivityInputModel = new GraphQLInputObjectType({
  name: "ActivityInput",
  fields: () => ({
    ...Activity,
  }),
});

const ReflectionTypeEnum = new GraphQLEnumType({
  name: "ReflectionType",
  values: {
    reflection: { value: true },
    argument: { value: false },
  },
});

const reflectionData = {
  title: { type: GraphQLString },
  solution: { type: GraphQLString },
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
