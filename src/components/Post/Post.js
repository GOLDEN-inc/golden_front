import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPost } from "../../actions/getPost";
import { updatePost } from "../../actions/updatePost";
import { deletePost } from "../../actions/deletePost";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import firebase from "../../firebase/config";
import "./Post.css";

const Post = (props) => {
    const loginSelector = useSelector((state) => state.login);
    const signinSelector = useSelector((state) => state.signup);

    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(null);

    const [defaultTitle, setDefaultTitle] = useState("");
    const [defaultContent, setDefaultContent] = useState("");
    const [fileref, setFileRef] = useState("");
    const [routeRedirect, setRedirect] = useState("");

    const [isBusy, setIsBusy] = useState(false);

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const fileRef = useRef(null);

    const [postid, setPostId] = useState("");

    const getPostSelector = useSelector((state) => state.getPost);
    console.log(getPostSelector);
    const dispatch = useDispatch();

    const getPostAction = (postid) => dispatch(getPost(postid));
    const updatePostAction = (postid, post) =>
        dispatch(updatePost(postid, post));
    const deletePostAction = (postid, fileref) =>
        dispatch(deletePost(postid, fileref));

    let currentPost;
    let editButton;
    let deleteButton;

    useEffect(() => {
        setTimer(true);
        setPostId(props.match.params.id);
        getPostAction(props.match.params.id);

        firebase.getUserState().then((user) => {
            setUserState(user);
        });

        setTimeout(() => setTimer(false), 1000);
        console.log("timer: ", timer);
    }, []);

    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to="/" />;
    }

    const updateCurrentPost = async (e) => {
        e.preventDefault();
        setIsBusy(true);
        const post = {
            id: postid,
            title: titleRef.current.value,
            content: contentRef.current.value,
        };

        if (fileRef.current.files.length > 0) {
            post["cover"] = fileRef.current.files[0];
            post["oldcover"] = getPostSelector.post.fileref;
        }

        let updatedRes = await updatePostAction(postid, post);
        setIsBusy(false);
        setRedirect(true);
    };

    const editPost = () => {
        setDefaultTitle(getPostSelector.post.title);
        setDefaultContent(getPostSelector.post.content);
        setFileRef(getPostSelector.post.fileref);
        setEditMode(!editMode);
    };

    const deleteCurrentPost = async () => {
        await deletePostAction(postid, fileref);
        setRedirect(true);
    };

    let updateForm;
    if (editMode) {
        if (
            loginSelector.user.hasOwnProperty("user") ||
            signinSelector.user.hasOwnProperty("user") ||
            (userState != null && isBusy == false)
        ) {
            deleteButton = (
                <Button color="danger" onClick={(e) => deleteCurrentPost()}>
                    Apagar
                </Button>
            );
        }
        if (isBusy) {
            updateForm = (
                <div className="processing">
                    <p>Request is being processed</p>
                    <div className="loader">Loading...</div>
                </div>
            );
        } else {
            updateForm = (
                <React.Fragment>
                    <Form className="form-post" onSubmit={updateCurrentPost}>
                        <h3>Alterar a indicação</h3>

                        <FormGroup>
                            <Label htmlFor="title">Nome do Local</Label>
                            <Input
                                type="text"
                                name="email"
                                ref={titleRef}
                                defaultValue={defaultTitle}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="content">Descrição do local</Label>
                            <Input
                                type="textarea"
                                name="content"
                                ref={contentRef}
                                defaultValue={defaultContent}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleFile">Foto</Label>
                            <Input type="file" ref={fileRef} />
                            <FormText color="muted">
                                Foto ou print da indicação.
                            </FormText>
                        </FormGroup>

                        <input type="submit" value="update post" />
                    </Form>
                </React.Fragment>
            );
        }
    }

    console.log("################ - 0. Timer", timer);
    if (timer) {
        console.log("################ - 1");
        currentPost = <div className="loader">Loading...</div>;
    } else {
        if (
            loginSelector.user.hasOwnProperty("user") ||
            signinSelector.user.hasOwnProperty("user") ||
            userState != null
        ) {
            console.log("################ - 2");
            editButton = (
                <button className="edit" onClick={(e) => editPost()}>
                    Edit Post
                </button>
            );
        }

        currentPost = (
            <div className="single">
                <img src={getPostSelector.post.cover} />

                <h2>{getPostSelector.post.title}</h2>
                <p>{getPostSelector.post.content}</p>

                {editButton}
                {updateForm}
                {deleteButton}
            </div>
        );
    }

    return <React.Fragment>{currentPost}</React.Fragment>;
};

export default Post;
