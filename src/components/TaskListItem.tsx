import React, { useRef } from "react";
import {
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  AlertButton,
  IonCheckbox,
} from "@ionic/react";
import { Session as Task } from "../models/Schedule";

interface SessionListItemProps {
  task: Task;
  listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  onRemoveTask: (id: number) => void;
  isFavorite: boolean;
}

const SessionListItem: React.FC<SessionListItemProps> = ({
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
  onShowAlert,
  onRemoveTask,
  task,
  listType,
}) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  };

  const removeFavoriteSession = () => {
    onAddFavorite(task.id);
    onShowAlert("Favorite already added", [
      {
        text: "Cancel",
        handler: dismissAlert,
      },
      {
        text: "Remove",
        handler: () => {
          onRemoveFavorite(task.id);
          dismissAlert();
        },
      },
    ]);
  };

  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession();
    } else {
      // remember this session as a user favorite
      onAddFavorite(task.id);
      onShowAlert("Favorite Added", [
        {
          text: "OK",
          handler: dismissAlert,
        },
      ]);
    }
  };

  const removeTask = () => {
    onRemoveTask(task.id);
  };

  return (
    <IonItemSliding
      ref={ionItemSlidingRef}
      class={"track-" + task.tracks[0].toLowerCase()}
    >
      <IonItem routerLink={`/tabs/task/${task.id}`}>
        <IonLabel>
          <h3>{task.name}</h3>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="danger" onClick={() => removeTask()}>
          Done
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(SessionListItem);
