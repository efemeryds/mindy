import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, informationCircle, people,man, homeSharp } from 'ionicons/icons';
import TasksPage from './pages/task/TasksPage';
import SpeakerList from './pages/SpeakerList';
import SpeakerDetail from './pages/SpeakerDetail';
import About from './pages/About';
import Mood from './pages/Mood'

import Mind from './pages/Mind';
import Talks from './pages/Talks';
import Home from "./pages/Home";
import TaskDetailPage from './pages/task/TaskDetailPage';

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.

        */}
        <Route path="/tabs/tasks" render={() => <TasksPage />} exact={true} />
        <Route
          path="/tabs/speakers"
          render={() => <SpeakerList />}
          exact={true}
        />
        <Route
          path="/tabs/speakers/:id"
          component={SpeakerDetail}
          exact={true}
        />
        <Route path="/tabs/task/:id" component={TaskDetailPage} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
        <Route path="/tabs/mood" render={() => <Mood />} exact={true} />

        
        <Route path="/tabs/mind" render={() => <Mind />} exact={true} />
        <Route path="/tabs/talks" render={() => <Talks />} exact={true} />
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Home" href="/tabs/home">
          <IonIcon icon={homeSharp} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Tasks" href="/tabs/tasks">
          <IonIcon icon={calendar} />
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mind" href="/tabs/mind">
          <IonIcon icon={man} />
          <IonLabel>Mind</IonLabel>
        </IonTabButton>
        <IonTabButton tab="talks" href="/tabs/talks">
          <IonIcon icon={people} />
          <IonLabel>Inspiration</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mood" href="/tabs/mood">
          <IonIcon icon={informationCircle} />
          <IonLabel>Mood</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
