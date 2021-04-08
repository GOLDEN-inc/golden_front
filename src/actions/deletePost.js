import firebase from '../firebase/config';

export const deletePost = (postId, fileref) => {
  return async function (dispatch) {
    const post = await firebase.deletePost(postId, fileref);
    dispatch({ type: 'DELETE_POST', payload: post });
  };
};
