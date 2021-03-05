import React, { useEffect, useState } from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../actions/logout";
import { getPosts } from "../actions/getPosts";

import firebase from "../firebase/config";

const Home = (props) => {
    const loginSelector = useSelector((state) => state.login);
    const signinSelector = useSelector((state) => state.signup);
    const [userState, setUserState] = useState(null);

    const getPostsSelector = useSelector((state) => state.getPosts);
    const dispatch = useDispatch();
    const getPostsAction = () => dispatch(getPosts());
    const logoutUserAction = () => dispatch(logoutUser());

    console.log(getPostsSelector.posts);

    useEffect(() => {
        getPostsAction();
    }, []);

    useEffect(() => {
        firebase.getUserState().then((user) => {
            setUserState(user);
        });
    });

    const logout = async () => {
        console.log("logout user");
        setUserState(null);
        await logoutUserAction();
        props.history.replace("/");
    };

    let buttons;
    if (
        (loginSelector.user && loginSelector.user.hasOwnProperty("user")) ||
        (signinSelector.user && signinSelector.user.hasOwnProperty("user")) ||
        userState != null
    ) {
        buttons = (
            <React.Fragment>
                <li>
                    <button className="logout" onClick={logout}>
                        LogOut
                    </button>
                </li>
            </React.Fragment>
        );
    } else {
        buttons = (
            <React.Fragment>
                <li>
                    <Link to="/registrar">signIn</Link>
                </li>
                <li>
                    <Link to="/login">logIn</Link>
                </li>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <header>
                <div>
                    <h1>
                        GOLDEN
                    </h1>
                    <p>
                        Faça uma indicação!
                    </p>
                </div>
            </header>

            {buttons}

            <Link to="/create">Publicar</Link>

            <div className="posts">
                {getPostsSelector.posts.map((post) => {
                    return (
                        <div className="post" key={post.id}>
                            <div
                                style={{
                                    backgroundImage: `url(${post.data.cover})`,
                                }}
                            />
                            <Link to={"post/" + post.id}>
                                <p>{post.data.title}</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default Home;
