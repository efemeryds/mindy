import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonGrid } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';
import {registerUser} from '../../firebase/firebaseConfig'

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setcPasswordError] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }
    if(!cpassword) {
      setcPasswordError(true);
    }
    if(cpassword !== password){
      setPasswordError(true);
      setcPasswordError(true);
    }

    if(username && password) {
      var res = await registerUser(username, password);
      if(res){
        history.push('/login', {direction: 'none'});
      }
    }
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar class="header-class">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Sign up</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      <IonContent color="secondary">
        <IonGrid>

        <form noValidate onSubmit={register}>
       
        <IonItem class="input-style">
      
              <IonLabel position="stacked" color="primary">
                
              Username </IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUsername(e.detail.value!);
                setUsernameError(false);
              }}
                required>
              </IonInput>
            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}
            </IonItem>

            <IonItem class="input-style">
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>         
            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
            </IonItem>

            <IonItem class="input-style">
              <IonLabel position="stacked" color="primary">Re-enter Password</IonLabel>
              <IonInput name="cpassword" type="password" value={cpassword} onIonChange={e => {
                setcPassword(e.detail.value!);
                setcPasswordError(false);
              }}>
              </IonInput>          

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
            </IonItem>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">SIGN UP</IonButton>
            </IonCol>
          </IonRow>
        </form>
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
