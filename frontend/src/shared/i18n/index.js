import * as Localization from "expo-localization";
import i18n from "i18n-js";

import en from "./translations/en";
import nb from "./translations/nb_NO";

i18n.translations = {
  en,
  nb,
};

i18n.defaultLocale = "nb";
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export const { t } = i18n;

export default i18n;
