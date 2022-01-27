import React, { useContext } from "react";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import SetPasswordScreen from "./SetPasswordScreen";
import VerifyUsernameScreen from "./VerifyUsernameScreen";

function ActivateAccountScreen() {
  const { isVerified } = useContext(ActivateAccountContext);
  return isVerified ? <SetPasswordScreen /> : <VerifyUsernameScreen />;
}

export default ActivateAccountScreen;
