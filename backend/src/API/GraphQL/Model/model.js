import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql";

const ResponseModel = {
  message: { type: GraphQLString },
  status: { type: GraphQLInt },
  type: { type: GraphQLString },
};

const NormalResponseModel = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

const ContactInfo = {
  name: { type: GraphQLString },
  role: { type: GraphQLString },
  phone: { type: GraphQLString },
  email: { type: GraphQLString },
};

const ContactsInfoInputModel = new GraphQLInputObjectType({
  name: "ContactsInfoInputModel",
  fields: () => ({
    ...ContactInfo,
  }),
});

const ContactsInfoModel = new GraphQLObjectType({
  name: "ContactsInfoModel",
  fields: () => ({
    ...ContactInfo,
  }),
});

const ProjectInfoModel = new GraphQLObjectType({
  name: "ProjectInfoModel",
  fields: () => ({
    contacts: { type: new GraphQLList(ContactsInfoModel) },
  }),
});

export {
  ContactsInfoInputModel,
  NormalResponseModel,
  ProjectInfoModel,
  ResponseModel,
};
