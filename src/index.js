import { BrowserRouter } from "react-router-dom";
import { Device } from '@capacitor/device';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@ionic/react/css/core.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";      

import common_ca from "./translations/ca.json";
import common_en from "./translations/en.json";
import common_es from "./translations/es.json";
import i18next from "i18next";




async function logDeviceInfo() {
  const lang = await Device.getLanguageCode()
  const lang_code = lang.value

  return lang_code
};



logDeviceInfo().then((value) => {
  i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: (value == 'en' | value == 'ca') ? value : 'en',                              // language to use
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

  const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
})


