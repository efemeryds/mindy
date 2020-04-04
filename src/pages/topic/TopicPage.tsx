import React, { useState, useRef } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonModal,
  IonHeader,
  IonTextarea,
  IonFab,
  IonFabButton,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonInput,
} from "@ionic/react";
import { options, search, addOutline } from "ionicons/icons";

import SessionListFilter from "../../components/SessionListFilter";
import "./TopicPage.scss";

import ShareSocialFab from "../../components/ShareSocialFab";

import * as selectors from "../../data/selectors";
import { connect } from "../../data/connect";
import {
  setSearchText,
  removeTopic,
  addTopic,
} from "../../data/sessions/sessions.actions";
import { Topic } from "../../models/Topic";
import * as uuid from "uuid";

interface OwnProps {}

interface StateProps {
  topics: Topic[];
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  removeTopic: typeof removeTopic;
  addTopic: typeof addTopic;
}

type TopicsPageProps = OwnProps & StateProps & DispatchProps;

const TopicPage: React.FC<TopicsPageProps> = ({
  setSearchText,
  topics,
  removeTopic,
  addTopic,
}) => {
  console.log("topicspage.topics loaded", topics);
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
  const [showTopicDeletedToast, setShowTopicDeletedToast] = useState(false);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar && (
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          )}
          {!showSearchbar && <IonTitle>My Topics</IonTitle>}
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
            <IonTitle size="large">Topics</IonTitle>
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
          {topics.map((topic) => (
            <IonItemSliding key={topic.id}>
              <IonItem routerLink={`/tabs/topic/${topic.id}`}>
                <IonLabel>
                  <h3>{topic.title}</h3>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption
                  color="danger"
                  onClick={() => {
                    removeTopic(topic.id);
                    setShowTopicDeletedToast(true);
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
      <IonModal isOpen={showNewTopicModal}>
        <IonContent>
          <h1>Create a new topic</h1>
          <IonInput
            value={topicTitle}
            placeholder="Topic Title"
            onIonChange={(e) => setTopicTitle(e.detail.value!)}
          />
          <IonTextarea
            value={topicDescription}
            placeholder="Description..."
            onIonChange={(e) => setTopicDescription(e.detail.value!)}
            rows={5}
          />
          <IonButton
            onClick={() => {
              addTopic(new Topic(uuid.v4(), topicTitle, topicDescription));
              setShowNewTopicModal(false);
            }}
          >
            Add
          </IonButton>
        </IonContent>
      </IonModal>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon
            icon={addOutline}
            onClick={() => setShowNewTopicModal(true)}
          />
        </IonFabButton>
      </IonFab>
      <IonToast
        isOpen={showTopicDeletedToast}
        message="Topic has been completed."
        duration={2000}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    topicList: selectors.getSearchedSchedule(state),
    topics: state.data.topics,
  }),
  mapDispatchToProps: {
    setSearchText,
    removeTopic,
    addTopic,
  },
  component: React.memo(TopicPage),
});
