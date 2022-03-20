import { createContext } from "react";

const ContentContext = createContext({
  user: {},
  categories: [],
  achievements: [],
  leaderboards: {},
  contacts: [],
});

export default ContentContext;
