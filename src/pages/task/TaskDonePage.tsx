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
} from "@ionic/react";
import { connect } from "../../data/connect";
import { withRouter, RouteComponentProps, useHistory } from "react-router";
import * as selectors from "../../data/selectors";
import { removeTask, updateTask } from "../../data/sessions/sessions.actions";
import { Task } from "../../models/Task";
import "./TaskPage.scss";
import OneToTen from "../../components/oneToten";

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
          <h1>{task.title}</h1>
          <p>{task.motivation}</p>
          <p>{task.feeling}</p>
        </div>
        <b> Describe your motivation ... </b>
        <OneToTen set={setValue} />
        <b> Your rate - {value}</b>
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
