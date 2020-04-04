import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import { connect } from "../../data/connect";
import { withRouter, RouteComponentProps } from "react-router";
import * as selectors from "../../data/selectors";
import { starOutline, star, share, createOutline } from "ionicons/icons";
import { removeTask, updateTask } from "../../data/sessions/sessions.actions";
import { Task } from "../../models/Task";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  task?: Task;
}

interface DispatchProps {
  removeTask: typeof removeTask;
  updateTask: typeof updateTask;
}

type TaskDetailProps = OwnProps & StateProps & DispatchProps;

const TaskDetailPage: React.FC<TaskDetailProps> = ({ task }) => {
  const [favourite, setFavourite] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task ? task.title : "");
  const [taskMotivation, setTaskMotivation] = useState(
    task ? task.motivation : ""
  );

  if (!task) {
    return <div>Task not found</div>;
  }
  const toggleFavorite = () => {
    favourite ? setFavourite(false) : setFavourite(true);
  };

  return (
    <IonPage id="session-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/tasks"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowEditTaskModal(true)}>
              <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
            </IonButton>
            <IonButton onClick={() => toggleFavorite()}>
              {favourite ? (
                <IonIcon slot="icon-only" icon={star}></IonIcon>
              ) : (
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              )}
            </IonButton>
            <IonButton onClick={() => {}}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{task.title}</h1>
          <p>{task.motivation}</p>
        </div>
        <IonList>
          <IonItem onClick={() => {}} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonModal isOpen={showEditTaskModal}>
        <IonContent>
          <h1>Edit task details</h1>
          <IonInput
            value={taskTitle}
            placeholder="What do you want to achieve?"
            onIonChange={(e) => setTaskTitle(e.detail.value!)}
          />
          <IonTextarea
            value={taskMotivation}
            placeholder="I want to do that, because it will ..."
            onIonChange={(e) => setTaskMotivation(e.detail.value!)}
            rows={5}
          />
          <IonButton
            onClick={() => {
              task.title = taskTitle;
              task.motivation = taskMotivation;
              updateTask(task);
              setShowEditTaskModal(false);
            }}
          >
            Save
          </IonButton>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    task: selectors.getTask(state, OwnProps),
  }),
  mapDispatchToProps: {
    removeTask,
    updateTask,
  },
  component: withRouter(TaskDetailPage),
});
