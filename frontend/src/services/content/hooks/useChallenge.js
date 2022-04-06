import { useApolloClient } from "@apollo/client";
import React from "react";

import { CHALLENGE_DATA } from "~shared/fragments";

function useChallenge(challengeID) {
  const [challenge, setChallenge] = React.useState();
  const client = useApolloClient();

  React.useEffect(() => {
    if (!challenge || challenge.id !== challengeID) {
      const item = client.readFragment({
        id: `Challenge:${challengeID}`,
        fragment: CHALLENGE_DATA,
      });
      setChallenge(item);
    }
  }, [client, challenge, challengeID]);

  return challenge;
}

export default useChallenge;
