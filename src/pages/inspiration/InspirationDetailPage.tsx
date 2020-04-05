import React from "react";
import { RouteComponentProps } from "react-router";

import "./InspirationPage.scss";

import {
  IonChip,
  IonIcon,
  IonHeader,
  IonLabel,
  IonToolbar,
  IonButtons,
  IonContent,
  IonButton,
  IonBackButton,
  IonPage,
} from "@ionic/react";
import {
  callOutline,
  callSharp,
  logoTwitter,
  logoGithub,
  logoInstagram,
  shareOutline,
  shareSharp,
} from "ionicons/icons";

import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import { Inspiration, InspirationCategory } from "../../models/Inspirations";

interface OwnProps extends RouteComponentProps {
  inspirationCategory?: InspirationCategory;
  inspiration?: Inspiration;
}

interface StateProps {}

interface DispatchProps {}

interface InspirationDetailProps extends OwnProps, StateProps, DispatchProps {}

const InspirationDetailPage: React.FC<InspirationDetailProps> = ({
  inspiration,
  inspirationCategory,
}) => {
  function openExternalUrl(url: string) {
    window.open(url, "_blank");
  }

  if (!inspiration) {
    return <div>Idea not found</div>;
  }
  if (!inspirationCategory) {
    return <div>Idea category not found</div>;
  }

  return (
    <IonPage id="speaker-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/speakers" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon
                  slot="icon-only"
                  ios={callOutline}
                  md={callSharp}
                ></IonIcon>
              </IonButton>
              <IonButton>
                <IonIcon
                  slot="icon-only"
                  ios={shareOutline}
                  md={shareSharp}
                ></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="speaker-background">
          <img
            src={inspirationCategory.categoryImage}
            alt={inspirationCategory.categoryName}
          />
          <h2>{inspirationCategory.categoryName}</h2>
        </div>

        <div className="ion-padding speaker-detail">
          <IonChip color="twitter" onClick={() => {}}>
            <IonIcon icon={logoTwitter}></IonIcon>
            <IonLabel>Twitter</IonLabel>
          </IonChip>

          <IonChip color="dark" onClick={() => {}}>
            <IonIcon icon={logoGithub}></IonIcon>
            <IonLabel>GitHub</IonLabel>
          </IonChip>

          <IonChip
            color="instagram"
            onClick={() =>
              openExternalUrl("https://instagram.com/ionicframework")
            }
          >
            <IonIcon icon={logoInstagram}></IonIcon>
            <IonLabel>Instagram</IonLabel>
          </IonChip>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect({
  mapStateToProps: (state, ownProps) => ({
    inspiration: selectors.getInspiration(state, ownProps),
    inspirationCategory: selectors.getInspirationCategory(state, ownProps),
  }),
  component: InspirationDetailPage,
});
