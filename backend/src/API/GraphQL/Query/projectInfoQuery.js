import { GraphQLList } from "graphql";
import {
  ContactsInfoInputModel,
  ProjectInfoModel,
} from "../../../internal.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const projectInfoQuery = {
  type: ProjectInfoModel,
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    const response = await providers.projectInfo.getAll();
    return response[0];
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests

const createProjectInfoQuery = {
  type: ProjectInfoModel,
  args: {
    contacts: {
      type: new GraphQLList(ContactsInfoInputModel),
    },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);
    return providers.projectInfo.add(args);
  },
};

export { createProjectInfoQuery, projectInfoQuery };
