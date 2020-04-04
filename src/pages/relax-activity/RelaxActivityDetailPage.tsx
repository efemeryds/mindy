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
import { removeRelaxActivity } from "../../data/sessions/sessions.actions";
import { RelaxActivity } from "../../models/RelaxActivity";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  relaxActivity?: RelaxActivity;
}

interface DispatchProps {
  removeRelaxActivity: typeof removeRelaxActivity;
}

type RelaxActivityDetailProps = OwnProps & StateProps & DispatchProps;

const RelaxActivityDetailPage: React.FC<RelaxActivityDetailProps> = ({
  relaxActivity,
}) => {
  const [favourite, setFavourite] = useState(false);
  console.log("relaxactivity.detailspage", relaxActivity);
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
          <p>{relaxActivity.description}</p>
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
    relaxActivity: selectors.getRelaxActivity(state, OwnProps),
  }),
  mapDispatchToProps: {
    removeRelaxActivity,
  },
  component: withRouter(RelaxActivityDetailPage),
});
