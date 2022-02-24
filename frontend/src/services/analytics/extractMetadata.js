export default function extractMetadata({ params }) {
  const metadata = {};
  if (params) {
    Object.keys(params).forEach((key) => {
      switch (key) {
        case "category":
          metadata.categoryID = params[key].id;
          break;
        case "challenge":
          metadata.challengeID = params[key].id;
          metadata.categoryID = params[key].category.id;
          break;
        // no default
      }
    });
  }
  return metadata;
}
