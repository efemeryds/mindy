import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonGrid } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import {loginUser} from '../firebase/firebaseConfig';
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      var result = await loginUser(username, password);
      if(result){
        await setIsLoggedIn(true);
        await setUsernameAction(username);
        history.push('/tabs/home', {direction: 'none'});
      }
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar class="header-class">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="body">
      <IonGrid>
          <IonRow class="ion-justify-content-center">
          <IonLabel class="font">
            mindy
          </IonLabel>
          </IonRow>
          <IonRow class="ion-justify-content-center">
          <IonLabel class="font">
            know thyself
          </IonLabel>
          </IonRow> 
          <br/>         
          
          <IonItem class="input-style">
            <IonInput placeholder="Username" onIonChange={(e:any) => setUsername(e.target.value)}></IonInput>
          </IonItem>            
          <IonItem class="input-style">
            <IonInput type="password" placeholder="Password" onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
          </IonItem>         
          <br/>
          <IonButton onClick={login} expand="full">Sign in</IonButton>
          <br/>
          
          <br/>
          <IonRow class="ion-justify-content-center">
            <IonLabel class="fontless">
              Clear your mind by planning, reviewing, practicing and meaningful converstaions
            </IonLabel>
          </IonRow>
         
          <div className="down">
            <IonButton routerLink="/signup" expand="full">Signup</IonButton>
          </div>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})
