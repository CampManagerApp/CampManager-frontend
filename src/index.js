import { FCM } from '@capacitor-community/fcm';
import { BrowserRouter } from "react-router-dom";
import { Device } from '@capacitor/device';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


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
import { language_configuration } from './i18n';


async function configureApp() {
  // configure applocation lenguage
  await language_configuration()

  // push notification configuration
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
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

  FCM.setAutoInit({ enabled: true })
}

// configure the app and 
configureApp().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
})





