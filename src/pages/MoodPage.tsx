import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';

import PlotComponent from '../components/PlotComponent';


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
        chart1
      <PlotComponent/>
      chart2
      <PlotComponent/>
      </IonContent>
    </IonPage>
  )
}

export default MoodPage;
