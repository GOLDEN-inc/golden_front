// import firebase from "../firebase/config";
import backendService from '../backendService';

export const logoutUser = () => {
  return async function (dispatch) {
    //
    // await firebase.logout();
    await backendService.logout();
    dispatch({ type: 'LOGIN_USER', payload: {} });
    dispatch({ type: 'CREATE_USER', payload: {} });
  };
};
