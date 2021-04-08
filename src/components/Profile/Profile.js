import React, {useEffect, useState} from 'react';
import backendService from '../../backendService';
import {isAuthenticated, getToken} from '../../backendService/auth';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

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
} from 'reactstrap';

import NavComponent from '../Navbar/Nav';
import QRCode from 'qrcode.react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

import golden_img from '../../images/golden_baby.jpg';

import './Profile.css';

// *Aldo Caamal - Redux
// import {useSelector, useDispatch} from "react-redux";
// import {Link} from "react-router-dom";
// import {logoutUser} from "../../actions/logout";

// import firebase from "../../firebase/config";

const Profile = (props) => {
    const [goldenInput, setGoldenInput] = useState('http://localhost:3000/user/' + JSON.parse(getToken()).user.golden);
    const [userIsSignedIn, setUserIsSignedIn] = useState(false);

    const {golden} = useParams();

    // *Aldo Caamal - Redux
    // const getPostsSelector = useSelector((state) => state.getPosts);
    // const dispatch = useDispatch();
    // const getPostsAction = () => dispatch(getPosts());
    // const logoutUserAction = () => dispatch(logoutUser());

    const editProfile = () => {};

    const logout = async () => {
        setUserIsSignedIn(false);
        await backendService.signout(() => props.history.replace('/'));
    };

    useEffect(() => {
        if (isAuthenticated()) {
            setUserIsSignedIn(true);
        }
    }, []);

    return (
        <React.Fragment> {' '}
            {
            userIsSignedIn && (
                <Navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="logout-button">
                            <NavLink onClick={logout}
                                className="nav-link">
                                <div className="row d-flex flex-column justify-content-center align-items-center">
                                    <FontAwesomeIcon size="lg"
                                        icon={faSignOutAlt}/>
                                    <div> {'Sair'}</div>
                                </div>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            )
        }
            <NavComponent/>
            <Container>
                <Row>
                    <Col>
                        <Container className="user-profile-container">
                            <img className="user-profile"
                                src={golden_img}
                                alt="user profile"/>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Container className="editar-button">
                        <button className="button1 button1-profile"
                            onClick={
                                (e) => editProfile(e)
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
                                    <Input type="text"
                                        placeholder={
                                            `${
                                                JSON.parse(getToken()).user.golden
                                            }`
                                        }
                                        onChange={
                                            (e) => setGoldenInput('http://localhost:3000/user/' + e.target.value)
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
            </Container>
        </React.Fragment>
    );
};

Profile.propTypes = {
    history: PropTypes.object
};

export default Profile;
