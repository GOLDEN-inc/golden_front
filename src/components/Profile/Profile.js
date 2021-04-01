import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import firebase from "../../firebase/config";

import {
    Container,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Label,
    Navbar,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

import {getPosts} from "../../actions/getPosts";

import NavComponent from "../Navbar/Nav";
import QRCode from "qrcode.react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";


import golden from "../../images/golden_baby.jpg";

import "./Profile.css";
import {logoutUser} from "../../actions/logout";

const Profile = (props) => {
    const [goldenInput, setGoldenInput] = useState("");
    const [userState, setUserState] = useState(null);

    const getPostsSelector = useSelector((state) => state.getPosts);
    const dispatch = useDispatch();
    const getPostsAction = () => dispatch(getPosts());
    const logoutUserAction = () => dispatch(logoutUser());


    const editProfile = () => {};

    useEffect(() => {
        getPostsAction();
    }, []);

    useEffect(() => {
        firebase.getUserState().then((user) => {
            setUserState(user);
        });
    });

    const logout = async () => {
        setUserState(null);
        await logoutUserAction();
        props.history.replace("/");
    };


    return (
        <React.Fragment>
            <Navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem className="logout-button">
                        <NavLink onClick={logout}
                            className="nav-link">
                            <div className="row d-flex flex-column justify-content-center align-items-center">
                                <FontAwesomeIcon size="lg"
                                    icon={faSignOutAlt}/>
                                <div>{"Sair"}</div>
                            </div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            <NavComponent/>
            <Container>
                <Row>
                    <Col>
                        <Container className="user-profile-container">
                            <img className="user-profile"
                                src={golden}
                                alt="user profile"/>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Container className="editar-button">
                        <button className="button1 button1-profile"
                            onClick={
                                (e) => editProfile()
                        }>
                            Salvar informações
                        </button>
                    </Container>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Container className="golden-container">
                                    <Label>GOLDEN</Label>
                                    <Input type="text" placeholder="Daphne"
                                        onChange={
                                            (e) => setGoldenInput(e.target.value)
                                        }/>
                                </Container>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col>
                        <Container className="qrcode-container">
                            <QRCode value={goldenInput}/>
                        </Container>
                    </Col>
                </Row>
                <hr className="profile-hr"/>
                <Row>
                    <Col>
                        <Container>
                            <Form>
                                <FormGroup>
                                    <Container>
                                        <Label className="label-center">PIX</Label>
                                        <Input type="text" placeholder="XXX.XXX.XXX-XX"/>
                                    </Container>
                                </FormGroup>
                            </Form>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label className="label-center">Posts</Label>
                    </Col>

                    <Col>
                        <div className="posts">
                            {" "}
                            {
                            getPostsSelector.posts.map((post) => {
                                return (
                                    <div className="post"
                                        key={
                                            post.id
                                    }>
                                        <div className="single">
                                            <img src={
                                                post.data.cover
                                            }/>
                                        </div>
                                        <Link to={
                                            "post/" + post.id
                                        }>
                                            <p className="post-title">
                                                {
                                                post.data.title
                                            } </p>
                                        </Link>
                                        <p className="post-content">
                                            {
                                            post.data.content
                                        } </p>
                                        <a className="link" target="_blank"
                                            href={
                                                post.data.link
                                        }>
                                            {" "}
                                            {
                                            post.data.link
                                        }
                                            {" "} </a>
                                    </div>
                                );
                            })
                        }
                            {" "} </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );;
};

export default Profile;
