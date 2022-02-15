import { GraphQLString } from "graphql";
import {
  AllCategoriesResponseModel,
  categoryCreator,
  CategoryResponseModel,
  getData,
  nextID,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

// Root Queries - Used to retrieve data with GET-Requests

const getAllCategoriesQuery = {
  type: AllCategoriesResponseModel,
  args: {},
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);

    const categoriesData = await getData(config.db.table.category);
    let categories = [];
    categoriesData.forEach((categoryData) => {
      const category = categoryCreator();
      categories.push(category.restoreObject(category, categoryData));
    });

    const response = getResponseObject(
      "Categories retrieved successfully",
      200,
      config.responseType.success
    );

    categories = await Promise.all(categories);
    response.data = categories;
    return response;
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests

const createCategoryQuery = {
  type: CategoryResponseModel,
  args: {
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const categoryID = nextID(config.db.table.category);
    const contentID = nextID(config.db.table.content);

    const category = categoryCreator();
    const newCategory = {
      id: categoryID,
    };
    category.updateData(newCategory);

    const newContent = {
      id: contentID,
      title: args.title,
      image: args.image,
      description: args.description,
    };
    category.content.updateData(newContent);
    await category.content.saveData(
      "content",
      category.content,
      config.db.table.content,
      "Content stored successfully."
    );
    const response = await category.saveData(
      "category",
      category,
      config.db.table.category,
      "Category stored successfully."
    );
    return response;
  },
};

export { createCategoryQuery, getAllCategoriesQuery };
