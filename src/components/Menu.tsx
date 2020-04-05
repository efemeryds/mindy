import React, { useState } from "react";
import { RouteComponentProps, withRouter, useLocation } from "react-router";

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import {
  calendarOutline,
  people,
  hammer,
  logIn,
  logOut,
  peopleOutline,
  person,
  personAdd,
  statsChartOutline,
  heartOutline,
} from "ionicons/icons";

import { connect } from "../data/connect";
import { setDarkMode } from "../data/user/user.actions";

import "./Menu.css";

const routes = {
  appPages: [
    { title: "Task list", path: "/tabs/tasks", icon: calendarOutline },
    { title: "Mood", path: "/tabs/mood", icon: statsChartOutline },
    { title: "Relax", path: "/tabs/mind", icon: heartOutline },
    { title: "Topics", path: "/tabs/topic", icon: people },
    { title: "Inspiration", path: "/tabs/inspirations", icon: peopleOutline },
  ],
  loggedInPages: [
    { title: "Account", path: "/account", icon: person },
    { title: "Logout", path: "/logout", icon: logOut },
  ],
  loggedOutPages: [
    { title: "Login", path: "/login", icon: logIn },
    { title: "Signup", path: "/signup", icon: personAdd },
  ],
};

interface Pages {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode;
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {}

const Menu: React.FC<MenuProps> = ({
  darkMode,
  history,
  isAuthenticated,
  setDarkMode,
  menuEnabled,
}) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={
              location.pathname.startsWith(p.path) ? "selected" : undefined
            }
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Mindy`s menu</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated
            ? renderlistItems(routes.loggedInPages)
            : renderlistItems(routes.loggedOutPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Intro</IonListHeader>
          <IonItem
            button
            onClick={() => {
              history.push("/intro");
            }}
          >
            <IonIcon slot="start" icon={hammer} />
            Intro
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled,
  }),
  mapDispatchToProps: {
    setDarkMode,
  },
  component: withRouter(Menu),
});
