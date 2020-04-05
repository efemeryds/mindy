import React from "react";
import { RouteComponentProps } from "react-router";

import "./InspirationDetailPage.scss";

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
  IonList,
  IonItem,
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
              <IonBackButton defaultHref="/tabs/inspirations" />
            </IonButtons>
            <IonButtons slot="end">
              {inspiration.moreLink ? (
                <IonButton>
                  <IonIcon
                    slot="icon-only"
                    ios={shareOutline}
                    md={shareSharp}
                  ></IonIcon>
                </IonButton>
              ) : null}
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
          <p>
            {inspiration.description}
            Say hello on social media!
          </p>
          <hr />
          <IonChip
            color="twitter"
            onClick={() => {
              openExternalUrl(
                "https://twitter.com/intent/tweet?text=" +
                  encodeURI(
                    "Check out this lockdown activities in the mindy app! https://mindy-mind.web.app"
                  )
              );
            }}
          >
            <IonIcon icon={logoTwitter}></IonIcon>
            <IonLabel>Twitter</IonLabel>
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

          <IonList>
            <IonItem onClick={() => {}} button>
              <IonLabel color="primary">Add to Task list</IonLabel>
            </IonItem>
          </IonList>
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
