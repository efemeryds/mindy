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
  IonModal,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./TaskPage.css";
import { useHistory } from "react-router-dom";

const TaskPage: React.FC = () => {
  const [task, setTask] = useState([
    "Cure covid-19!",
    "Win a hackathon",
    "Catch'em all!",
  ]);
  const [showTaskDeletedToast, setShowTaskDeletedToast] = useState(false);
  const removeTask = (index: number) => {
    setShowTaskDeletedToast(true);
    setTask([...task.slice(0, index), ...task.slice(index + 1)]);
  };
  const addTask = (title: string) => {
    setTask([...task, title]);
    setNewTask("");
  };
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState("");
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
            <IonIcon
              icon={addOutline}
              onClick={() => setShowNewTaskModal(true)}
            />
          </IonFabButton>
        </IonFab>
        <IonList>
          {task.map((task, i) => (
            <IonItem key={i} onClick={() => history.push("/task/" + i)}>
              <span className="checkbox-container">
                <IonCheckbox
                  checked={false}
                  onIonChange={() => removeTask(i)}
                />
              </span>
              <IonLabel className="ion-padding-start">{task}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonModal isOpen={showNewTaskModal}>
          <h1>Create a new task</h1>
            <IonTextarea
              value={newTask}
              placeholder="Task details...."
              onIonChange={(e) => setNewTask(e.detail.value!)}
            ></IonTextarea>
          <IonButton
            onClick={() => {
              addTask(newTask);
              setShowNewTaskModal(false);
            }}
          >
            OK
          </IonButton>
        </IonModal>
        <IonToast
          isOpen={showTaskDeletedToast}
          message="Task has been completed."
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default TaskPage;
