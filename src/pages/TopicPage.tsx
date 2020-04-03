import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './TopicPage.css';
import topicpage from '../images/topicpage.png';

const TopicPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Topic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Topic Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <a href="/home">
          <IonImg src={topicpage} />
        </a>
      </IonContent>
    </IonPage>
  );
};

export default TopicPage;
