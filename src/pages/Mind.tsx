import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';

interface MindProps { }

const Mind: React.FC = () => {  
  return (
    <IonPage>
    <IonHeader id="mind-page">
        <IonToolbar class="header-class">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Mind</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    </IonContent>
    </IonPage>
  );
};


export default Mind