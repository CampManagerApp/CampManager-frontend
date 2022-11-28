import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@ionic/react/css/core.css';
import Popper from '@popperjs/core';
import common_cat from "./translations/cat.json";
import common_en from "./translations/en.json";
import i18next from "i18next";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
      en: {
          common: common_en               // 'common' is our custom namespace
      },
      cat: {
          common: common_cat
      },
  },
});
