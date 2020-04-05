import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import "./InspirationPage.scss";
import { InspirationCategory } from "../../models/Inspirations";
import InspirationCategoryComponent from "../../components/InspirationCategoryComponent";

interface OwnProps {}

interface StateProps {
  inspirations: InspirationCategory[];
}

interface DispatchProps {}

interface InspirationPageProps extends OwnProps, StateProps, DispatchProps {}

const InspirationPage: React.FC<InspirationPageProps> = ({ inspirations }) => {
  return (
    <IonPage id="speaker-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Inspirations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonGrid fixed>
          <IonRow>
            {inspirations.map((category) => (
              <IonCol size="12" size-md="6" key={category.id}>
                <InspirationCategoryComponent
                  key={category.categoryName}
                  category={category}
                  items={category.items}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    inspirations: selectors.getInspirations(state),
  }),
  component: React.memo(InspirationPage),
});
