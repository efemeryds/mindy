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
import "./RelaxActivityDetailPage.scss";

import ShareSocialFab from "../../components/ShareSocialFab";

import * as selectors from "../../data/selectors";
import { connect } from "../../data/connect";
import {
  setSearchText,
  removeRelaxActivity,
  addRelaxActivity,
} from "../../data/sessions/sessions.actions";
import { RelaxActivity } from "../../models/RelaxActivity";
import * as uuid from "uuid";

interface OwnProps {}

interface StateProps {
  relaxactivitys: RelaxActivity[];
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  removeRelaxActivity: typeof removeRelaxActivity;
  addRelaxActivity: typeof addRelaxActivity;
}

type RelaxActivitysPageProps = OwnProps & StateProps & DispatchProps;

const RelaxActivitysPage: React.FC<RelaxActivitysPageProps> = ({
  setSearchText,
  relaxactivitys,
  removeRelaxActivity,
  addRelaxActivity,
}) => {
  console.log("relaxactivityspage.relaxactivitys loaded", relaxactivitys);
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
  const [
    showRelaxActivityDeletedToast,
    setShowRelaxActivityDeletedToast,
  ] = useState(false);
  const [showNewRelaxActivityModal, setShowNewRelaxActivityModal] = useState(
    false
  );
  const [relaxactivityTitle, setRelaxActivityTitle] = useState("");
  const [relaxactivityDescription, setRelaxActivityDescription] = useState("");

  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar && (
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          )}
          {!showSearchbar && <IonTitle>My RelaxActivitys</IonTitle>}
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
            <IonTitle size="large">RelaxActivitys</IonTitle>
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
          {relaxactivitys.map((relaxactivity) => (
            <IonItemSliding key={relaxactivity.id}>
              <IonItem routerLink={`/tabs/relaxactivity/${relaxactivity.id}`}>
                <IonLabel>
                  <h3>{relaxactivity.title}</h3>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption
                  color="danger"
                  onClick={() => {
                    removeRelaxActivity(relaxactivity.id);
                    setShowRelaxActivityDeletedToast(true);
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
      <IonModal isOpen={showNewRelaxActivityModal}>
        <IonContent>
          <h1>Create a new relaxactivity</h1>
          <IonInput
            value={relaxactivityTitle}
            placeholder="RelaxActivity Title"
            onIonChange={(e) => setRelaxActivityTitle(e.detail.value!)}
          />
          <IonTextarea
            value={relaxactivityDescription}
            placeholder="Description..."
            onIonChange={(e) => setRelaxActivityDescription(e.detail.value!)}
            rows={5}
          />
          <IonButton
            onClick={() => {
              addRelaxActivity(
                new RelaxActivity(
                  uuid.v4(),
                  relaxactivityTitle,
                  relaxactivityDescription
                )
              );
              setShowNewRelaxActivityModal(false);
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
            onClick={() => setShowNewRelaxActivityModal(true)}
          />
        </IonFabButton>
      </IonFab>
      <IonToast
        isOpen={showRelaxActivityDeletedToast}
        message="RelaxActivity has been completed."
        duration={2000}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    relaxactivityList: selectors.getSearchedSchedule(state),
    relaxactivitys: state.data.relaxActivities,
  }),
  mapDispatchToProps: {
    setSearchText,
    removeRelaxActivity,
    addRelaxActivity,
  },
  component: React.memo(RelaxActivitysPage),
});
