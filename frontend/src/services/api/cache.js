import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        challenges: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Leaderboard: {
      fields: {
        scores: {
          merge(existing, incoming, { readField, mergeObjects }) {
            const merged = existing ? existing.slice(0) : [];
            const userToIndex = Object.create(null);
            if (existing) {
              existing.forEach((userScore, index) => {
                userToIndex[readField("userID", userScore)] = index;
              });
            }
            incoming.forEach((userScore) => {
              const id = readField("userID", userScore);
              const index = userToIndex[id];
              if (typeof index === "number") {
                merged[index] = mergeObjects(merged[index], userScore);
              } else {
                userToIndex[id] = merged.length;
                merged.push(userScore);
              }
            });
            return merged;
          },
        },
      },
    },
  },
});
