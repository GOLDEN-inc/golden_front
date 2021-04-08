const deletePost = (
  state = {
    posts: [],
  },
  action
) => {
  if (action.type === "DELETE_POST") {
    state = { ...state, post: action.payload };
  }
  return state;
};

export default deletePost;
