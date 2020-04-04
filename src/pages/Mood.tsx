import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';

import PlotComponent from '../components/PlotComponent';
import PlotTasks from '../components/PlotTasks';

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
        <div className="ion-text-center">
        Mood in time
      <PlotComponent/>
      Mood and tasks corelation
      <PlotTasks/>
      </div>>
      </IonContent>
    </IonPage>
  )
}

export default MoodPage;
