import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './HomePage.css';
import homepage from '../images/homepage.png';


const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Start</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Start</IonTitle>
          </IonToolbar>
        </IonHeader>
        <a href="/home" ><IonImg src={homepage}/></a>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
