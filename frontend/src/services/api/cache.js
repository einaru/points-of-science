import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    Leaderboard: {
      fields: {
        scores: {
          merge(existing, incoming, { readField, mergeObjects }) {
            const merged = existing ? existing.slice(0) : [];
            const userToIndex = Object.create(null);
            if (existing) {
              existing.forEach((highScore, index) => {
                userToIndex[readField("userID", highScore)] = index;
              });
            }
            incoming.forEach((highScore) => {
              const id = readField("userID", highScore);
              const index = userToIndex[id];
              if (typeof index === "number") {
                merged[index] = mergeObjects(merged[index], highScore);
              } else {
                userToIndex[id] = merged.length;
                merged.push(highScore);
              }
            });
            return merged;
          },
        },
      },
    },
  },
});
