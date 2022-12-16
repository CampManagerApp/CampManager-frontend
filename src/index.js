import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


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
  console.log('entre')
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


  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });


  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token) => {
      console.log('Push registration success, token: ' + token.value);
    }
  );

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    }
  );

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification) => {
      console.log('Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
    }
  );

  const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
})


