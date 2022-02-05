import { GraphQLString } from "graphql";
import {
  authenticateAccessToken,
  AllCategoriesResponseModel,
  config,
  categoryCreator,
  CategoryResponseModel,
  checkPermissionLevel,
  getData,
  nextID,
} from "../../../internal.js";

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
    try {
      await authenticateAccessToken(context);
      const categoriesData = await getData(config.env.CATEGORY_TABLE);
      let categories = [];
      categoriesData.forEach((categoryData) => {
        const category = categoryCreator();
        categories.push(category.restoreObject(category, categoryData));
      });

      const response = getResponseObject(
        "Categories retrieved successfully",
        200,
        config.env.RESPONSE_TYPE.success
      );

      categories = await Promise.all(categories);
      response.data = categories;
      return response;
    } catch (error) {
      return error;
    }
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
    try {
      await authenticateAccessToken(context);
      let response = checkPermissionLevel(
        config.env.PERMISSION_LEVELS.ADMIN,
        context.user
      );

      if (response.type === "error") {
        return response;
      }

      const categoriesData = await getData(config.env.CATEGORY_TABLE);
      const contentData = await getData(config.env.CONTENT_TABLE);
      const categoryID = nextID(categoriesData);
      const contentID = nextID(contentData);

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
      await category.content.saveData(category.content);
      response = await category.saveData(category);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export { createCategoryQuery, getAllCategoriesQuery };
