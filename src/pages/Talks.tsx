import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';

interface TalksProps { }

const Talks: React.FC = () => { 
 
  return (
    <IonPage>
    <IonHeader id="talks-page">
        <IonToolbar class="header-class">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Talks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
    </IonContent>
    </IonPage>
  );
};


export default Talks