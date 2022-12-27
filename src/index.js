import { FCM } from '@capacitor-community/fcm';
import { BrowserRouter } from "react-router-dom";
import { PushNotifications, } from '@capacitor/push-notifications';
import { language_configuration } from './i18n';
import { isPlatform } from '@ionic/react';


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

async function configureApp() {
  // configure applocation lenguage
  await language_configuration()

  // lock sreen orientation
  window.screen.orientation.lock('portrait')

  // disable notifications if the platform is different of android
  if (!isPlatform('android'))
    return

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





