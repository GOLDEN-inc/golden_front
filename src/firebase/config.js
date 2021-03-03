import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBI7UwfGSlkBKSpg7zar3b2zS80LcT5m10",
    authDomain: "chat-app-d79c7.firebaseapp.com",
    databaseURL: "https://chat-app-d79c7-default-rtdb.firebaseio.com",
    projectId: "chat-app-d79c7",
    storageBucket: "chat-app-d79c7.appspot.com",
    messagingSenderId: "237416485325",
    appId: "1:237416485325:web:677557a08edcde914df484",
    measurementId: "G-2LPSTWN2BS",
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    async login(email, password) {
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log(err);
            });
        return user;
    }

    async signup(email, password) {
        const user = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log(err);
            });
        return user;
    }

    async logout() {
        const logout = await firebase
            .auth()
            .signOut()
            .catch((err) => console.log(err));
        return logout;
    }

    async getUserState() {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }
}

export default new Firebase();
