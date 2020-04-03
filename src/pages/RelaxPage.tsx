import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import './RelaxPage.css';
import relaxpage from '../images/relaxpage.png';

const RelaxPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Relax</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <a href="/home">
          <IonImg src={relaxpage} />
        </a>
      </IonContent>
    </IonPage>
  );
};

export default RelaxPage;
