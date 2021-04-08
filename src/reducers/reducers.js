import { combineReducers } from "redux";

import getPosts from "./getPosts";
import createPost from "./create";
import getPost from "./getPost";
import loginUser from "./login";
import logoutUser from "./logout";
import createUser from "./signup";
import updatePost from "./updatePost";
import deletePost from "./deletePost";

const reducers = combineReducers({
  login: loginUser,
  signup: createUser,
  logout: logoutUser,
  create: createPost,
  getPost: getPost,
  getPosts: getPosts,
  updatePost: updatePost,
  deletePost: deletePost,
});

export default reducers;
