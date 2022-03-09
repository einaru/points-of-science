/* eslint-disable import/prefer-default-export */

import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const contact = {
  name: { type: GraphQLString },
  role: { type: GraphQLString },
  phone: { type: GraphQLString },
  email: { type: GraphQLString },
};

export const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: () => ({
    ...contact,
  }),
});

export const ContactInputType = new GraphQLInputObjectType({
  name: "ContactInput",
  fields: () => ({
    ...contact,
  }),
});
