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

import "./Home.scss";
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
          
        <div className="font3"> Mood vs time</div>
      
          <PlotComponent />
          <div className="font3"> Mood vs tasks corelation</div>
        
          <PlotTasks />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MoodPage;
