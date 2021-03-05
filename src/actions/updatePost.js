import firebase from "../firebase/config";

export const updatePost = (postId, postData) => {
    return async function (dispatch) {
        const post = await firebase
            .updatePost(postId, postData)
            .catch((err) => console.log(err));
        if (post) {
            dispatch({ type: "UPDATE_POST", payload: post });
            return post;
        } else {
            console.log("Error encountered");
        }
    };
};
