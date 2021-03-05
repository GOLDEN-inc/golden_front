import { combineReducers } from "redux";
import createPost from "./create";
import loginUser from "./login";
import logoutUser from "./logout";
import createUser from "./signup";

const reducers = combineReducers({
    login: loginUser,
    signup: createUser,
    logout: logoutUser,
    create: createPost,
});

export default reducers;
