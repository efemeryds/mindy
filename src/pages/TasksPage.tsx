import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import taskspage from '../images/taskspage.png';


const TopicPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tasks Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <a href="/home" ><IonImg src={taskspage}/></a>
      </IonContent>
    </IonPage>
  );
};

export default TopicPage;
