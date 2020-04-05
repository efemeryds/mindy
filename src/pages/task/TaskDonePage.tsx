import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonButton,
  IonList,
  IonRange,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { connect } from "../../data/connect";
import { withRouter, RouteComponentProps, useHistory } from "react-router";
import * as selectors from "../../data/selectors";
import { removeTask, updateTask } from "../../data/sessions/sessions.actions";
import { Task } from "../../models/Task";
import "./TaskPage.scss";
import OneToTen from "../../components/oneToten";
import { sadOutline, happyOutline } from "ionicons/icons";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  task?: Task;
}

interface DispatchProps {
  updateTask: typeof updateTask;
}

type TaskDetailProps = OwnProps & StateProps & DispatchProps;

const TaskDonePage: React.FC<TaskDetailProps> = ({ task }) => {
  const [taskTitle, setTaskTitle] = useState(task ? task.title : "");
  const [taskMotivation, setTaskMotivation] = useState(
    task ? task.motivation : ""
  );
  const [value, setValue] = useState(0);
  const history = useHistory();
  if (!task) {
    return <div>Task not found</div>;
  }
  return (
    <IonPage id="session-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/tasks"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h2>How do you feel now</h2>
          <p>when the task is done?</p>
        </div>

        <div className="ion-padding">
          <b>Task: {task.title}</b>
          <p>{task.motivation}</p>
        </div>

        <IonRange
          min={1}
          max={10}
          step={1}
          ticks={true}
          pin={true}
          onIonChange={(e) => {
            setValue(e.detail.value as number);
          }}
        >
          <IonLabel slot="start">Unsatisfied</IonLabel>
          <IonIcon slot="start" icon={sadOutline} />

          <IonLabel slot="end">Satisfied</IonLabel>
          <IonIcon slot="end" icon={happyOutline} />
        </IonRange>
        <div className="ion-text-center"> Your rate {value}</div>
        <div className="down">
          <IonButton
            color="danger"
            style={{ width: "100%" }}
            onClick={() => {
              task.title = taskTitle;
              task.motivation = taskMotivation;
              task.done = true;
              // task.endDate = new Date();
              task.feeling = value;
              updateTask(task);
              history.push("/tabs/tasks/");
            }}
          >
            End Task
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    task: selectors.getTask(state, OwnProps),
  }),
  mapDispatchToProps: {
    updateTask,
  },
  component: withRouter(TaskDonePage),
});
