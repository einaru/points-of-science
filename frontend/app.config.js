import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      httpEndpoint: process.env.HTTP_ENDPOINT,
      wsEndpoint: process.env.SUBSCRIPTION_ENDPOINT,
    },
  };
};
