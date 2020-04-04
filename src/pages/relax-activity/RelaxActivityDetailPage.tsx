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
import {
  removeRelaxActivity,
  updateRelaxActivity,
} from "../../data/sessions/sessions.actions";
import { RelaxActivity } from "../../models/RelaxActivity";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  relaxActivity?: RelaxActivity;
}

interface DispatchProps {
  removeRelaxActivity: typeof removeRelaxActivity;
  updateRelaxActivity: typeof updateRelaxActivity;
}

type RelaxActivityDetailProps = OwnProps & StateProps & DispatchProps;

const RelaxActivityDetailPage: React.FC<RelaxActivityDetailProps> = ({
  relaxActivity,
}) => {
  const [favourite, setFavourite] = useState(false);
  const [showEditRelaxActivityModal, setShowEditRelaxActivityModal] = useState(
    false
  );
  const [relaxactivityTitle, setRelaxActivityTitle] = useState(
    relaxActivity ? relaxActivity.title : ""
  );
  const [relaxactivityMotivation, setRelaxActivityMotivation] = useState(
    relaxActivity ? relaxActivity.motivation : ""
  );

  if (!relaxActivity) {
    return <div>RelaxActivity not found</div>;
  }
  const toggleFavorite = () => {
    favourite ? setFavourite(false) : setFavourite(true);
  };

  return (
    <IonPage id="session-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/relaxactivitys"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowEditRelaxActivityModal(true)}>
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
          <h1>{relaxActivity.title}</h1>
          <p>{relaxActivity.motivation}</p>
        </div>
        <IonList>
          <IonItem onClick={() => {}} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonModal isOpen={showEditRelaxActivityModal}>
        <IonContent>
          <h1>Edit relaxactivity details</h1>
          <IonInput
            value={relaxactivityTitle}
            placeholder="What do you want to achieve?"
            onIonChange={(e) => setRelaxActivityTitle(e.detail.value!)}
          />
          <IonTextarea
            value={relaxactivityMotivation}
            placeholder="I want to do that, because it will ..."
            onIonChange={(e) => setRelaxActivityMotivation(e.detail.value!)}
            rows={5}
          />
          <IonButton
            onClick={() => {
              relaxActivity.title = relaxactivityTitle;
              relaxActivity.motivation = relaxactivityMotivation;
              updateRelaxActivity(relaxActivity);
              setShowEditRelaxActivityModal(false);
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
    relaxActivity: selectors.getRelaxActivity(state, OwnProps),
  }),
  mapDispatchToProps: {
    removeRelaxActivity,
    updateRelaxActivity,
  },
  component: withRouter(RelaxActivityDetailPage),
});
