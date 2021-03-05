import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBdtZIodtPmVK9XUiVY1VEJYIYO-CPf_ts",
    authDomain: "golden-ef7d8.firebaseapp.com",
    projectId: "golden-ef7d8",
    storageBucket: "golden-ef7d8.appspot.com",
    messagingSenderId: "737929226078",
    appId: "1:737929226078:web:195f7f2b78b79b031a91cf",
    measurementId: "G-9S6SWXRQ90",
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

    async createPost(post) {
        const storageRef = firebase.storage().ref();
        // create a child inside the storage
        const storageChild = storageRef.child(post.cover.name);
        const postCover = await storageChild.put(post.cover);
        const downloadURL = await storageChild.getDownloadURL();
        const fileRef = postCover.ref._delegate._location.path;

        let newPost = {
            title: post.title,
            content: post.content,
            cover: downloadURL,
            fileref: fileRef,
        };

        const firestorePost = await firebase
            .firestore()
            .collection("posts")
            .add(newPost)
            .catch((err) => {
                console.log(err);
            });

        return firestorePost;
    }

    async getUserState() {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }
}

export default new Firebase();
