const updatePost = (
  state = {
    posts: [],
  },
  action
) => {
  if (action.type === 'UPDATE_POST') {
    state = { ...state, post: action.payload };
  }
  return state;
};

export default updatePost;
