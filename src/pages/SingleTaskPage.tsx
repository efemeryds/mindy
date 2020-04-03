import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useParams } from "react-router-dom";


const SingleTaskPage: React.FC = () => {
  let { taskId } = useParams();
  
  console.log("userId", taskId);
  return (
    <IonPage>
      <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/task"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
        <h1>Task:{taskId}</h1>
      </IonContent>
    </IonPage>
  );
};

export default SingleTaskPage;
