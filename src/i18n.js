import common_ca from "./translations/ca.json";
import common_en from "./translations/en.json";
import common_es from "./translations/es.json";
import i18next from "i18next";
import { Device } from '@capacitor/device';


export async function language_configuration() {
    const lang = await Device.getLanguageCode()
    const lang_code = lang.value

    i18next.init({
        interpolation: { escapeValue: false },  // React already does escaping
        lng: (lang_code == 'en' | lang_code == 'ca' | lang_code == 'es') ? lang_code : 'en',                              // language to use
        resources: {
          en: {
            common: common_en               // 'common' is our custom namespace
          },
          ca: {
            common: common_ca
          },
          es: {
            common: common_es
          },
        },
      });
  }