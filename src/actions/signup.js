import firebase from "../firebase/config";
import axios from "axios"

export const createUser = (email, password, name, golden, pix, telfone_wpp) => {
    return async function (dispatch) {

        const user = {
            name,
            golden,
            email,
            password,
            pix,
            telfone_wpp

        }

        // const user = await firebase.signup(email, password); //! Code to user firebase
        const userFetch = fetch("http://localhost:8081/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(err => console.log(err))
        console.log(user);
        dispatch({type: "CREATE_USER", payload: userFetch});
    };
};
