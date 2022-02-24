import { GraphQLList, GraphQLString } from "graphql";
import { CategoryModel, categoryCreator } from "../../../internal.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const getAllCategoriesQuery = {
  type: new GraphQLList(CategoryModel),
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);

    const categoriesData = await providers.categories.getAll();
    const challengesData = await providers.challenges.getAll();
    let categories = [];
    categoriesData.forEach((categoryData) => {
      categories.push(
        new Promise((resolve, reject) => {
          const category = categoryCreator();
          let progress = null;
          if (categoryData.progressID.trim().length > 0) {
            progress = providers.progresses.getByID(categoryData.progressID);
          }

          Promise.all([progress])
            .then((data) => {
              return category.restoreObject(
                category,
                categoryData,
                challengesData,
                data
              );
            })
            .then(() => {
              resolve(category.convertToResponseObject(category));
            })
            .catch((error) => {
              reject(error);
            });
        })
      );
    });

    categories = await Promise.all(categories);
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
