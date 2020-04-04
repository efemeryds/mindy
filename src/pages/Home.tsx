import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from "@ionic/react";
import "./Home.scss";
import { useHistory } from "react-router";

interface IconNavProps {
  text: string;
  iconName: string;
  url: string;
}

const IconNav = (props: IconNavProps) => {
  let history = useHistory();
  const handle = () => {
    history.push(props.url);
  };
  return (
    <>
      <div className="center" onClick={handle}>
        <IonAvatar class="avatr">
          <img src={"assets/icon/" + props.iconName} />
        </IonAvatar>
        <IonLabel>
          <h2>{props.text}</h2>
        </IonLabel>
      </div>
    </>
  );
};

const Home: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar></IonToolbar>
        </IonHeader>

        <div className="home-title">
          mindy <p>structure your life</p>
        </div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IconNav url="/tabs/tasks" text="Tasks" iconName="tasks.png" />
            </IonCol>
            <IonCol>
              <IconNav url="/tabs/talks" text="Topics" iconName="topics.png" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IconNav url="/tabs/mood" text="Mood" iconName="mood.png" />
            </IonCol>
            <IonCol>
              <IconNav url="/tabs/mind" text="Mind" iconName="mind.png" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IconNav url="/tabs/speakers" text="Inspirations" iconName="cloud.png" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);
