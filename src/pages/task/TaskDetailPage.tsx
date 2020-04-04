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
} from "@ionic/react";
import { connect } from "../../data/connect";
import { withRouter, RouteComponentProps } from "react-router";
import * as selectors from "../../data/selectors";
import { starOutline, star, share } from "ionicons/icons";
import { removeTask } from "../../data/sessions/sessions.actions";
import { Task } from "../../models/Task";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  task?: Task;

}

interface DispatchProps {
  removeTask: typeof removeTask;
}

type TaskDetailProps = OwnProps & StateProps & DispatchProps;

const TaskDetailPage: React.FC<TaskDetailProps> = ({ task }) => {
  const [favourite, setFavourite] = useState(false);
  console.log('task.detailspage',task)
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
          <p>{task.description}</p>
        </div>
        <IonList>
          <IonItem onClick={() => {}} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    task: selectors.getTask(state, OwnProps),
  }),
  mapDispatchToProps: {
    removeTask
  },
  component: withRouter(TaskDetailPage),
});
