import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RelaxPage from './pages/RelaxPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import TopicPage from './pages/TopicPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/home" component={HomePage} exact={true} />
          <Route path="/relax" component={RelaxPage} />
          <Route path="/topic" component={TopicPage} />
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/login">
            <IonIcon icon={triangle} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/home">
            <IonIcon icon={ellipse} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Relax" href="/relax">
            <IonIcon icon={square} />
            <IonLabel>Relax</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Topic" href="/topic">
            <IonIcon icon={square} />
            <IonLabel>Topic</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
