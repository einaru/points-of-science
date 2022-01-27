import React, { useContext } from "react";
import ActivateAccountPasswordScreen from "./ActivateAccountPasswordScreen";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import ActivateAccountUsernameScreen from "./ActivateAccountUsernameScreen";

function ActivateAccountStack() {
  const { isVerified } = useContext(ActivateAccountContext);
  return isVerified ? (
    <ActivateAccountPasswordScreen />
  ) : (
    <ActivateAccountUsernameScreen />
  );
}

export default ActivateAccountStack;
