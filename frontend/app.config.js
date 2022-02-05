import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiEndpoint: process.env.API_ENDPOINT,
    },
  };
};
