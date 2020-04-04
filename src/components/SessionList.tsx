import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Schedule, Session as Task } from '../models/Schedule';
import TaskListItem from './TaskListItem';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';

interface OwnProps {
  tasks: Schedule;
  listType: 'all' | 'favorites';
  hide: boolean;
}

interface StateProps {
  favoriteSessions: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface TaskListProps extends OwnProps, StateProps, DispatchProps { };

const TaskList: React.FC<TaskListProps> = ({ addFavorite: addPriority, removeFavorite: removePriority, favoriteSessions: priorityTasks, hide, tasks: tasks, listType }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (tasks.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Sessions Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {tasks.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            {/* <IonItemDivider sticky>
              <IonLabel>
                {group.time}
              </IonLabel>
            </IonItemDivider> */}
            {group.sessions.map((task: Task, taskIndex: number) => (
              <TaskListItem
                onShowAlert={handleShowAlert}
                isFavorite={priorityTasks.indexOf(task.id) > -1}
                onAddFavorite={addPriority}
                onRemoveFavorite={removePriority}
                key={`group-${index}-${taskIndex}`}
                session={task}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: TaskList
});