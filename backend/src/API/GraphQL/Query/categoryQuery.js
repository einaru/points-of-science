import { GraphQLList, GraphQLString } from "graphql";
import {
  CategoryModel,
  categoryCreator,
  getData,
  nextID,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const getAllCategoriesQuery = {
  type: new GraphQLList(CategoryModel),
  args: {},
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);

    const categoriesData = await getData(config.db.table.category);
    let categories = [];
    categoriesData.forEach((categoryData) => {
      const category = categoryCreator();
      categories.push(category.restoreObject(category, categoryData));
    });

    categories = await Promise.all(categories);
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
      config.db.table.content
    );
    return category.saveData("category", category, config.db.table.category);
  },
};

export { createCategoryQuery, getAllCategoriesQuery };
