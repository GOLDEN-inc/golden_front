// import firebase from "../firebase/config";
import backendService from "../backendService"

export const createUser = (email, password, name, golden, pix, telfone_wpp) => {
    return async function (dispatch) {
        // dispatch function for creating a new user

        // const user = await firebase.signup(email, password); //! Code to user firebase
        const user = await backendService.signup(email, password, name, golden, pix, telfone_wpp)
        console.log(user);
        dispatch({type: "CREATE_USER", payload: user});
    };
};
