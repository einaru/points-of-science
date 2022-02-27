import { GraphQLList, GraphQLString } from "graphql";
import { CategoryModel, categoryCreator } from "../../../internal.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const getAllCategoriesQuery = {
  type: new GraphQLList(CategoryModel),
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);

    const userData = await providers.users.getByID(user.id);

    const categoriesData = await providers.categories.getAll();
    const challengesData = await providers.challenges.getAll();
    const categories = [];
    categoriesData.forEach((categoryData) => {
      const category = categoryCreator();
      category.restoreObject(category, categoryData, challengesData);
      const challengeIDs = category.data.challenges.map((item) => item.data.id);
      const progress = category.progress.calculateProgress(
        userData.challenges,
        challengeIDs
      );
      category.progress.setProgress(progress);
      categories.push(category.convertToResponseObject(category));
    });

    categories.forEach((element) => {
      const challenges = [];
      element.challenges.forEach((challenge) => {
        challenges.push(challenge.convertToResponseObject(challenge));
      });
      element.challenges = challenges;
    });

    return categories;
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests

const createCategoryQuery = {
  type: CategoryModel,
  args: {
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);

    const category = categoryCreator();

    const newContent = {
      title: args.title,
      image: args.image,
      description: args.description,
    };
    category.content.updateData(newContent);
    const storedCategory = category.convertToStoredObject(category);
    const object = await providers.categories.add(storedCategory);
    category.updateData(object);
    return category.convertToResponseObject(category);
  },
};

export { createCategoryQuery, getAllCategoriesQuery };
