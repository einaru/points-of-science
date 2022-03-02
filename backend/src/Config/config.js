import "dotenv/config";

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  secret: {
    accessToken: process.env.ACCESS_TOKEN_SECRET || null,
    refreshToken: process.env.REFRESH_TOKEN_SECRET || null,
  },
  db: {
    table: {
      activity: "Activity",
      category: "Category",
      challenge: "Challenge",
      clickStream: "ClickStream",
      clickStreamItem: "ClickStreamItem",
      content: "Content",
      progress: "Progress",
      refreshToken: "RefreshToken",
      reflection: "Reflection",
      reward: "Reward",
      user: "User",
      validUsername: "ValidUsername",
    },
    // FIXME Remove these attributes when tests are updated.
    test: {
      file: process.env.DATABASE_TEST_FILE,
      folder: process.env.DATABASE_TEST_FOLDER,
      data: process.env.DATABASE_TEST_DATA,
      firestore: process.env.FIRESTORE,
    },
  },
  responseType: {
    success: "success",
    error: "error",
  },
  permissionLevel: {
    admin: 1,
    experiment: 2,
    control: 3,
  },
};

export default config;
