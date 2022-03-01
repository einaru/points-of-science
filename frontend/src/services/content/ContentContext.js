import { createContext } from "react";

const ContentContext = createContext({
  categories: [],
  user: {},
});

export default ContentContext;
