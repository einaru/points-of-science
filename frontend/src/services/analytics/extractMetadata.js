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
          // FIXME Update when backend returns a resolved category object
          metadata.categoryID = params[key].categoryID;
          break;
        // no default
      }
    });
  }
  return metadata;
}
