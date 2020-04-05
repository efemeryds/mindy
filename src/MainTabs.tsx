import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import {
  calendar,
  people,
  homeSharp,
  statsChartOutline,
  heartOutline,
  flaskSharp,
} from "ionicons/icons";
import TaskPage from "./pages/task/TaskPage";
import About from "./pages/About";
import Mood from "./pages/Mood";
import Home from "./pages/Home";
import TaskDetailPage from "./pages/task/TaskDetailPage";
import RelaxActivityDetailPage from "./pages/relax-activity/RelaxActivityDetailPage";
import RelaxActivityPage from "./pages/relax-activity/RelaxActivityPage";
import TopicDetailPage from "./pages/topic/TopicDetailPage";
import TopicPage from "./pages/topic/TopicPage";
import InspirationPage from "./pages/inspiration/InspirationPage";
import InspirationDetailPage from "./pages/inspiration/InspirationDetailPage";

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

        <Route path="/tabs/inspirations" component={InspirationPage} exact={true}/>
        <Route path="/tabs/inspirations/:categoryId/:id" component={InspirationDetailPage}/>
        <Route path="/tabs/tasks" render={() => <TaskPage />} exact={true} />
        <Route path="/tabs/tasks/:id" component={TaskDetailPage} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
        <Route path="/tabs/mood" render={() => <Mood />} exact={true} />

        <Route
          path="/tabs/mind"
          render={() => <RelaxActivityPage />}
          exact={true}
        />
        <Route path="/tabs/mind/:id" component={RelaxActivityDetailPage} />
        <Route path="/tabs/topic" render={() => <TopicPage />} exact={true} />
        <Route path="/tabs/topic/:id" component={TopicDetailPage} />
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

        <IonTabButton tab="mood" href="/tabs/mood">
          <IonIcon icon={statsChartOutline} />
          <IonLabel>Mood</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mind" href="/tabs/mind">
          <IonIcon icon={heartOutline} />
          <IonLabel>Relax</IonLabel>
        </IonTabButton>
        <IonTabButton tab="topic" href="/tabs/topic">
          <IonIcon icon={people} />
          <IonLabel>Topics</IonLabel>
        </IonTabButton>
        <IonTabButton tab="inspirations" href="/tabs/inspirations">
          <IonIcon icon={flaskSharp} />
          <IonLabel>Inspirations</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
