export default function extractMetadata({ params }) {
  const metadata = {};
  if (params) {
    Object.keys(params).forEach((key) => {
      if (["categoryID", "challengeID"].includes(key)) {
        metadata[key] = params[key];
      }
    });
  }
  return metadata;
}
