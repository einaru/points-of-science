import "dotenv/config";

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  secret: {
    accessToken: process.env.ACCESS_TOKEN_SECRET || null,
    refreshToken: process.env.REFRESH_TOKEN_SECRET || null,
    subscribeToken: process.env.SUBSCRIBE_TOKEN_SECRET || null,
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
  },
  responseType: {
    success: "success",
    error: "error",
  },
  storage: {
    databaseURL: process.env.DATABASE_URL,
    bucket: process.env.GOOGLE_STORAGE_BUCKET,
  },
  permissionLevel: {
    admin: 1,
    experiment: 2,
    control: 3,
  },
};

export default config;
