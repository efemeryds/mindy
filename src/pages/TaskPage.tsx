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
  IonToast,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./TaskPage.css";
import { useHistory } from "react-router-dom";

const TaskPage: React.FC = () => {
  const [task, setTask] = useState(["Catch'em all!", "Win a hackathon"]);
  const [showToast, setShowToast] = useState(false);
  const remove = (index: number) => {
    setShowToast(true);
    setTask([...task.slice(0, index), ...task.slice(index + 1)]);
  };
  let history = useHistory();
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
            <IonItem key={i} onClick={(e) => history.push("/task/" + i)}>
              <span className="checkbox-container">
                <IonCheckbox checked={false} onIonChange={(e) => remove(i)} />
              </span>
              <IonLabel className="ion-padding-start">{t}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={showToast}
          message="Task has been completed."
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default TaskPage;
