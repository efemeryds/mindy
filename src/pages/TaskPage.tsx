import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFabButton,
  IonFab,
  IonIcon,
  IonLabel,
  IonList,
  IonItem,
  IonCheckbox,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

const TaskPage: React.FC = () => {
  const [task, setTask] = useState(["Catch'em all!", "Win a hackathon"]);
  const remove = (index: number ) => {
    setTask([...task.slice(0, index), ...task.slice(index + 1)]);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My tasks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        <IonList>
          {task.map((t, i) => (
            <IonItem key={i} button href={"/task/"+i}>
              <IonCheckbox checked={false} onIonChange={(e) => remove(i)} />
              <IonLabel className="ion-padding-start">{t}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TaskPage;
