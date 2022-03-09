import { GraphQLList } from "graphql";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";
import { ContactInputType, ContactType } from "../Model/contactModel.js";

export const getAllContacts = {
  type: new GraphQLList(ContactType),
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    return providers.contacts.getAll();
  },
};

export const addContact = {
  type: ContactType,
  args: {
    contact: {
      type: ContactInputType,
    },
  },
  async resolve(_, { contact }, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);
    return providers.contacts.add(contact);
  },
};
