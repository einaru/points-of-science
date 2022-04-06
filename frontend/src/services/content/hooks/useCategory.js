import { useApolloClient } from "@apollo/client";
import React from "react";

import { CATEGORY_DATA } from "~shared/fragments";

function useChallenge(categoryID) {
  const [category, setCategory] = React.useState();
  const client = useApolloClient();

  React.useEffect(() => {
    if (!category || category.id !== categoryID) {
      const item = client.readFragment({
        id: `Category:${categoryID}`,
        fragment: CATEGORY_DATA,
        fragmentName: "CategoryData",
      });
      setCategory(item);
    }
  }, [client, category, categoryID]);

  return category;
}

export default useChallenge;
