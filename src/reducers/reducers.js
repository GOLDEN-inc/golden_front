import { combineReducers } from "redux";
import loginUser from "./login";
import logoutUser from "./logout";
import createUser from "./signup";

const reducers = combineReducers({
    login: loginUser,
    signup: createUser,
    logout: logoutUser,
});

export default reducers;
