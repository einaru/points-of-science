import React, { useContext } from "react";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import SetPasswordScreen from "./SetPasswordScreen";
import VerifyUsername from "./VerifyUsername";

function ActivateAccountScreen() {
  const { isVerified } = useContext(ActivateAccountContext);
  return isVerified ? <SetPasswordScreen /> : <VerifyUsername />;
}

export default ActivateAccountScreen;
