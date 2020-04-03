import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import { useParams } from 'react-router-dom';

const SingleTaskPage: React.FC = () => {
    let {taskId} = useParams();
    console.log('userId',taskId);
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
    <h1>Task:{taskId}</h1>
      </IonContent>
    </IonPage>
  );
};

export default SingleTaskPage;
