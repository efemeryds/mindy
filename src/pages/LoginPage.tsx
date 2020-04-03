import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import './LoginPage.css';
import loginpage from '../images/loginpage.png';

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Logowanie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <a href="/home">
          <IonImg src={loginpage} />
        </a>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
