import React, { useState, useRef } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSlides,
  IonSlide,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { setMenuEnabled } from "../data/sessions/sessions.actions";
import { setHasSeenTutorial } from "../data/user/user.actions";
import "./Intro.scss";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps {}

const Tutorial: React.FC<TutorialProps> = ({
  history,
  setHasSeenTutorial,
  setMenuEnabled,
}) => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push("/tabs/home", { direction: "none" });
  };

  const handleSlideChangeStart = () => {
    slideRef.current!.isEnd().then((isEnd) => setShowSkip(!isEnd));
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && (
              <IonButton color="primary" onClick={startApp}>
                Skip
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides
          ref={slideRef}
          onIonSlideWillChange={handleSlideChangeStart}
          pager={false}
        >
        
          <IonSlide>
            
            <img 
              src="assets/img/intro/intro-1.png"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">
              Welcome 🎉!
            </h2>
            <p>
              Our main goal is to help you focus on what is essential, create proper structure to move forward with your plans and dreams and have space for introspection, reflection and inspiration!
            </p>
          </IonSlide>

          <IonSlide>
            <img
              src="assets/img/intro/intro-3.png"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">How to start?</h2>
            <p>
            Just have a will to go back to basics and to discover how you may simply bring by yourself meaning and focus into your life to calm the mind
            </p>
          </IonSlide>
          <IonSlide>
            <img
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">Ready? Let's mind the mind!</h2>
            <IonButton fill="clear" onClick={startApp}>
              Start
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setHasSeenTutorial,
    setMenuEnabled,
  },
  component: Tutorial,
});
