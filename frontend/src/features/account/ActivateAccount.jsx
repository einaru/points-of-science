import React from "react";

import { FormAction, FormLink, FormView } from "~shared/components";
import { t } from "~shared/i18n";

import { ActivateAccountContext } from "./ActivateAccountProvider";
import SetPassword from "./SetPassword";
import VerifyUsername from "./VerifyUsername";

function ActivateAccount() {
  const { username, isVerified, resetUsername } = React.useContext(
    ActivateAccountContext
  );
  return (
    <FormView>
      {isVerified ? <SetPassword /> : <VerifyUsername />}
      <FormAction
        label={t("Reset")}
        mode="outlined"
        disabled={username === ""}
        onPress={resetUsername}
      />
      <FormLink
        label={t("Log in")}
        message={t("Already activated your account?")}
        screenName="account:login"
      />
    </FormView>
  );
}

export default ActivateAccount;
