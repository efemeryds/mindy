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
import { removeTopic, updateTopic } from "../../data/sessions/sessions.actions";
import { Topic } from "../../models/Topic";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  topic?: Topic;
}

interface DispatchProps {
  removeTopic: typeof removeTopic;
  updateTopic: typeof updateTopic;
}

type TopicDetailProps = OwnProps & StateProps & DispatchProps;

const TopicDetailPage: React.FC<TopicDetailProps> = ({ topic }) => {
  const [favourite, setFavourite] = useState(false);
  const [showEditTopicModal, setShowEditTopicModal] = useState(false);
  const [topicTitle, setTopicTitle] = useState(topic ? topic.title : "");
  const [topicMotivation, setTopicMotivation] = useState(
    topic ? topic.motivation : ""
  );

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
            <IonButton onClick={() => setShowEditTopicModal(true)}>
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
          <h1>{topic.title}</h1>
          <p>{topic.motivation}</p>
        </div>
        <IonList>
          <IonItem onClick={() => {}} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonModal isOpen={showEditTopicModal}>
        <IonContent>
          <h1>Edit topic details</h1>
          <IonInput
            value={topicTitle}
            placeholder="What do you want to achieve?"
            onIonChange={(e) => setTopicTitle(e.detail.value!)}
          />
          <IonTextarea
            value={topicMotivation}
            placeholder="I want to do that, because it will ..."
            onIonChange={(e) => setTopicMotivation(e.detail.value!)}
            rows={5}
          />
          <IonButton
            onClick={() => {
              topic.title = topicTitle;
              topic.motivation = topicMotivation;
              updateTopic(topic);
              setShowEditTopicModal(false);
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
    topic: selectors.getTopic(state, OwnProps),
  }),
  mapDispatchToProps: {
    removeTopic,
    updateTopic,
  },
  component: withRouter(TopicDetailPage),
});
