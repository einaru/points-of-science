import React from "react";

import { t } from "~shared/i18n";

import { ActivateAccountContext } from "./ActivateAccountProvider";
import FormAction from "./FormAction";
import FormLink from "./FormLink";
import FormView from "./FormView";
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
