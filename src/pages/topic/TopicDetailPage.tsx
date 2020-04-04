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
import { removeTopic } from "../../data/sessions/sessions.actions";
import { Topic } from "../../models/Topic";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  topic?: Topic;
}

interface DispatchProps {
  removeTopic: typeof removeTopic;
}

type TopicDetailProps = OwnProps & StateProps & DispatchProps;

const TopicDetailPage: React.FC<TopicDetailProps> = ({ topic }) => {
  const [favourite, setFavourite] = useState(false);
  console.log("topic.detailspage", topic);
  if (!topic) {
    return <div>Topic not found</div>;
  }
  const toggleFavorite = () => {
    favourite ? setFavourite(false) : setFavourite(true);
  };

  return (
    <IonPage id="session-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/topics"></IonBackButton>
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
          <h1>{topic.title}</h1>
          <p>{topic.description}</p>
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
    topic: selectors.getTopic(state, OwnProps),
  }),
  mapDispatchToProps: {
    removeTopic,
  },
  component: withRouter(TopicDetailPage),
});
