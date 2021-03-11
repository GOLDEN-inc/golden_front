import React, { useEffect, useState } from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import ReactTextRotator from "react-text-rotator";

import arrow from "../../images/arrow-down-white.png";
import golden from "../../images/golden_baby.jpg";

import { getPosts } from "../../actions/getPosts";

import Nav from "../Navbar/Nav";
import "./Home.css";

import firebase from "../../firebase/config";

const Home = (props) => {
    const [userState, setUserState] = useState(null);

    const getPostsSelector = useSelector((state) => state.getPosts);
    const dispatch = useDispatch();
    const getPostsAction = () => dispatch(getPosts());

    const content = [
        {
            text: "Nós somos a Golden.",
            className: "classA",
            animation: "fade",
        },
        {
            text: "Através de uma rede de influenciadores",
            className: "classB",
            animation: "fade",
        },
        {
            text: "Impactamos pessoas e criamos conexões.",
            className: "classC",
            animation: "fade",
        },
        {
            text: "Vamos nessa?",
            className: "classD",
            animation: "fade",
        },
    ];

    useEffect(() => {
        getPostsAction();
    }, []);

    useEffect(() => {
        firebase.getUserState().then((user) => {
            setUserState(user);
        });
    });

    const TextRotator = () => (
        <ReactTextRotator content={content} time={2150} startDelay={350} />
    );

    return (
        <React.Fragment>
            <Nav />
            <React.Fragment>
                <section
                    className="section section-lg vh-100"
                    id="home"
                    style={{
                        backgroundImage: `url(${golden})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                >
                    <div className="bg-overlay"></div>
                    <div className="display-table">
                        <div className="display-table-cell">
                            <Container>
                                <Row>
                                    <Col
                                        lg={{ size: 8, offset: 2 }}
                                        className="text-white text-center"
                                    >
                                        <h1 className="home-title text-rotate">
                                            <TextRotator />
                                        </h1>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Col className="text-center">
                                    <img
                                        src={arrow}
                                        alt="continue"
                                        style={{
                                            height: "2rem",
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
            </React.Fragment>

            <React.Fragment>
                <Container className="main-text-container">
                    <Row>
                        <Col>
                            <h1 className="main-text">
                                Indicações de nossa rede
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <p>
                            Abaixo estão todas as indicações feitas em nossas
                            redes, para aproximar pessoas e ajudar tanto
                            estabelecimentos onlines, quanto físico.
                        </p>
                        <p>Divirta-se, Golden!</p>
                    </Row>
                </Container>
            </React.Fragment>

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
                                <p className="post-title">{post.data.title}</p>
                            </Link>
                            <p className="post-content">{post.data.content}</p>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default Home;
