import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType,
} from "graphql";

const deviceInfo = {
  isDevice: { type: GraphQLBoolean },
  brand: { type: GraphQLString },
  manufacturer: { type: GraphQLString },
  modelName: { type: GraphQLString },
  osName: { type: GraphQLString },
  osVersion: { type: GraphQLString },
  osBuildId: { type: GraphQLString },
};

const DeviceInfoType = new GraphQLObjectType({
  name: "DeviceInfo",
  fields: () => ({
    ...deviceInfo,
  }),
});

export const DeviceInfoInput = new GraphQLInputObjectType({
  name: "DeviceInfoInput",
  fields: () => ({
    ...deviceInfo,
  }),
});

const metadata = {
  categoryID: { type: GraphQLString },
  challengeID: { type: GraphQLString },
  prevScreen: { type: GraphQLString },
  source: { type: GraphQLString },
};

const MetadataType = new GraphQLObjectType({
  name: "Metadata",
  fields: () => ({
    ...metadata,
  }),
});

const MetadataInput = new GraphQLInputObjectType({
  name: "MetadataInput",
  fields: () => ({
    ...metadata,
  }),
});

const clickStream = {
  event: { type: GraphQLString },
  screen: { type: GraphQLString },
  timestamp: { type: GraphQLString },
};

const ClickEventType = new GraphQLObjectType({
  name: "ClickEvent",
  fields: () => ({
    ...clickStream,
    metadata: { type: MetadataType },
  }),
});

export const ClickEventInput = new GraphQLInputObjectType({
  name: "ClickEventInput",
  fields: () => ({
    ...clickStream,
    metadata: { type: MetadataInput },
  }),
});

export const ClickStreamType = new GraphQLObjectType({
  name: "ClickStream",
  fields: () => ({
    id: { type: GraphQLString },
    sessionToken: { type: GraphQLString },
    userID: { type: GraphQLString },
    deviceInfo: { type: DeviceInfoType },
    clicks: { type: new GraphQLList(ClickEventType) },
  }),
});

const LikertScale = new GraphQLEnumType({
  name: "LikertScale",
  values: {
    stronglyDisagree: { value: -2 },
    disagree: { value: -1 },
    neutral: { value: 0 },
    agree: { value: 1 },
    stronglyAgree: { value: 2 },
  },
});

export const SmileOMeterInput = new GraphQLInputObjectType({
  name: "SmileOMeterInput",
  fields: () => ({
    challengeID: { type: GraphQLString },
    value: { type: LikertScale },
  }),
});
