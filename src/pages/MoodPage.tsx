import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import moodpage from '../images/moodpage.png';

const MoodPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mood</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mood Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <a href="/home">
          <IonImg src={moodpage} />
        </a>
      </IonContent>
    </IonPage>
  );
};

export default MoodPage;
