import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDlWgX5mGzvCEQ_aoV3JLZGkbeXLUcnMDM",
    authDomain: "react-my-burger-b6392.firebaseapp.com",
    databaseURL: "https://react-my-burger-b6392.firebaseio.com",
    projectId: "react-my-burger-b6392",
    storageBucket: "react-my-burger-b6392.appspot.com",
    messagingSenderId: "972297403279",
    appId: "1:972297403279:web:501a5b90a1fea7c70c29fa",
    measurementId: "G-GZHG6T9C2R"
})

export const auth = app.auth();
export default app;