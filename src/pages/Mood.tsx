import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

import PlotComponent from "../components/PlotComponent";
import PlotTasks from "../components/PlotTasks";

const MoodPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mood</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-text-center mood-container">
          <h1>Mood in time</h1>
          <PlotComponent />
          <h1>Mood and tasks corelation</h1>
          <PlotTasks />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MoodPage;
