import React, { useState, useRef } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonSegment,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonModal,
  IonHeader,
  getConfig,
  IonTextarea,
  IonFab,
  IonFabButton,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { options, search, addOutline } from "ionicons/icons";

import SessionListFilter from "../components/SessionListFilter";
import "./TasksPage.scss";

import ShareSocialFab from "../components/ShareSocialFab";

import * as selectors from "../data/selectors";
import { connect } from "../data/connect";
import { setSearchText, removeTask } from "../data/sessions/sessions.actions";
import { Task } from "../models/Task";

interface OwnProps {}

interface StateProps {
  tasks: Task[];
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  removeTask: typeof removeTask;
}

type TasksPageProps = OwnProps & StateProps & DispatchProps;

const TasksPage: React.FC<TasksPageProps> = ({
  setSearchText,
  tasks,
  removeTask,
}) => {
  console.log("taskspage.tasks loaded", tasks);
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };
  const [showTaskDeletedToast, setShowTaskDeletedToast] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState("");

  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar && (
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          )}
          {!showSearchbar && <IonTitle>My Tasks</IonTitle>}
          {showSearchbar && (
            <IonSearchbar
              showCancelButton="always"
              placeholder="Search"
              onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
              onIonCancel={() => setShowSearchbar(false)}
            ></IonSearchbar>
          )}

          <IonButtons slot="end">
            {!showSearchbar && (
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            )}
            {!showSearchbar && (
              <IonButton onClick={() => setShowFilterModal(true)}>
                <IonIcon icon={options} slot="icon-only" />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              placeholder="Search"
              onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher
          slot="fixed"
          ref={ionRefresherRef}
          onIonRefresh={doRefresh}
        >
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />

        <IonList>
          {tasks.map((task) => (
            <IonItemSliding key={task.id}>
              <IonItem routerLink={`/tabs/task/${task.id}`}>
                <IonLabel>
                  <h3>{task.title}</h3>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption
                  color="danger"
                  onClick={() => {
                    removeTask(task.id);
                    setShowTaskDeletedToast(true);
                  }}
                >
                  Done
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
        cssClass="session-list-filter"
      >
        <SessionListFilter onDismissModal={() => setShowFilterModal(false)} />
      </IonModal>

      <ShareSocialFab />
      <IonModal isOpen={showNewTaskModal}>
        <h1>Create a new task</h1>
        <IonTextarea
          value={newTask}
          placeholder="Task details...."
          onIonChange={(e) => setNewTask(e.detail.value!)}
        ></IonTextarea>
        <IonButton
          onClick={() => {
            setShowNewTaskModal(false);
          }}
        >
          OK
        </IonButton>
      </IonModal>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon
            icon={addOutline}
            onClick={() => setShowNewTaskModal(true)}
          />
        </IonFabButton>
      </IonFab>
      <IonToast
        isOpen={showTaskDeletedToast}
        message="Task has been completed."
        duration={2000}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    taskList: selectors.getSearchedSchedule(state),
    tasks: state.data.tasks,
  }),
  mapDispatchToProps: {
    setSearchText,
    removeTask,
  },
  component: React.memo(TasksPage),
});
