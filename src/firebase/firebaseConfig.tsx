import * as firebase from 'firebase';
import {toast} from '../util/toast'
import * as SM from '../util/StorageManager'

const config = {
    apiKey: "AIzaSyDLpxv_B0s9v92mK5Ps890YsZ_EPMt_Yzc",
    authDomain: "mindy-mind.firebaseapp.com",
    databaseURL: "https://mindy-mind.firebaseio.com",
    projectId: "mindy-mind",
    storageBucket: "mindy-mind.appspot.com",
    messagingSenderId: "784811965404",
    appId: "1:784811965404:web:3cb0a1e7ea63bfa2962d19",
    measurementId: "G-EYD0K2FZ70"
}

firebase.initializeApp(config);

export async function loginUser(username:string, password:string){
    try{
        const email = `${username}@hackit.yeah`
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        SM.setItem('User', JSON.stringify(res));
        return true;
    }
    catch(error){       
        toast(error, 4000);
        return false;
    }
}

export async function registerUser(username:string, password:string){
    try{
        const email = `${username}@hackit.yeah`
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return true;
    }
    catch(error){
        toast(error, 4000);
        return false;
    }
}