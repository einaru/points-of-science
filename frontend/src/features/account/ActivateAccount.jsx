import React, { useContext } from "react";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import SetPassword from "./SetPassword";
import VerifyUsername from "./VerifyUsername";

function ActivateAccount() {
  const { isVerified } = useContext(ActivateAccountContext);
  return isVerified ? <SetPassword /> : <VerifyUsername />;
}

export default ActivateAccount;
