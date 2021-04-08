import React, {useEffect, useState} from 'react';
import backendService from '../../backendService';
import user_backend from '../../backendService/user';
import {isAuthenticated, getToken} from '../../backendService/auth';
import PropTypes from 'prop-types';
import {Redirect, useParams} from 'react-router-dom';

import {
    Alert,
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
import {faDraftingCompass, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

import golden_img from '../../images/golden_baby.jpg';

import './Profile.css';

// *Aldo Caamal - Redux
// import {useSelector, useDispatch} from "react-redux";
// import {Link} from "react-router-dom";
// import {logoutUser} from "../../actions/logout";

// import firebase from "../../firebase/config";

const Profile = (props) => {
    // * Profile component

    // golden
    const [goldenInput, setGoldenInput] = useState('');

    // Check if user is signed in
    const [userIsSignedIn, setUserIsSignedIn] = useState(false);

    // Get user data from API
    const [userData, setUserData] = useState(undefined);

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

    useEffect(async () => {
        if (isAuthenticated()) 
            setUserIsSignedIn(true);
        


        let data = await user_backend.getUserByGolden(golden);
        setUserData(data);
        if (userData != undefined) 
            setGoldenInput('http://localhost:3000/user/' + userData.user.golden);
        


    }, []);

    if (userData === undefined) {
        return <Alert color="warning">
            Carregando...
        </Alert>;
    }

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
            <Container className='main-container'>
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
                    <Col>
                        <Form>
                            <FormGroup>
                                <Container className="golden-container">
                                    <Label>GOLDEN</Label>
                                    <Input type="text"
                                        placeholder={
                                            `${
                                                userData.user.golden
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
                <hr className="profile-hr"/> {
                userIsSignedIn && (
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
                )
            }
                {
                userIsSignedIn && (
                    <>
                        <Row>
                            <Col>
                                <Form>
                                    <FormGroup>
                                        <Container className="golden-container">
                                            <Label>Nome</Label>
                                            <Input type="text"
                                                placeholder={
                                                    `${
                                                        userData.user.name
                                                    }`
                                                }/>
                                        </Container>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <FormGroup>
                                        <Container className="golden-container">
                                            <Label>E-mail</Label>
                                            <Input type="text"
                                                placeholder={
                                                    `${
                                                        userData.user.email
                                                    }`
                                                }/>
                                        </Container>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <FormGroup>
                                        <Container className="golden-container">
                                            <Label>PIX</Label>
                                            <Input type="text"
                                                placeholder={
                                                    `${
                                                        userData.user.pix
                                                    }`
                                                }/>
                                        </Container>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <FormGroup>
                                        <Container className="golden-container">
                                            <Label>Telefone Whatsapp</Label>
                                            <Input type="text"
                                                placeholder={
                                                    `${
                                                        userData.user.telfone_wpp
                                                    }`
                                                }/>
                                        </Container>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </>
                )
            } </Container>
        </React.Fragment>
    );
};

Profile.propTypes = {
    history: PropTypes.object
};

export default Profile;
