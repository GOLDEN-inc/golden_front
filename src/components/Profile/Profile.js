import React, { useEffect, useState } from 'react';
import backendService from '../../backendService';
import { getUserByGolden, updateUserByGolden } from '../../backendService/user';
import { isAuthenticated, getToken } from '../../backendService/auth';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

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
  NavLink,
} from 'reactstrap';

import NavComponent from '../Navbar/Nav';
import QRCode from 'qrcode.react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import golden_img from '../../images/golden_baby.jpg';

import './Profile.css';

// *Aldo Caamal - Redux
// import {useSelector, useDispatch} from "react-redux";
// import {Link} from "react-router-dom";
// import {logoutUser} from "../../actions/logout";

// import firebase from "../../firebase/config";

const Profile = (props) => {
  // * Profile component

  // Check if user is signed in
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);

  // -- Get user data from API - GOLDEN
  const [userGolden, setUserGolden] = useState(undefined);

  // -- Get user data from API - Name
  const [userName, setUserName] = useState(undefined);

  // -- Get user data from API - Email
  const [userEmail, setUserEmail] = useState(undefined);

  // -- Get user data from API - PIX
  const [userPix, setUserPix] = useState(undefined);

  // -- Get user data from API - WPP
  const [userWpp, setUserWpp] = useState(undefined);

  // User balance
  const [userBalance, setUserBalance] = useState(0.0);

  // User withdraw
  const [userWithdraw, setUserWithdraw] = useState(0.0);

  // User error message
  const [errorMessage, setErrorMessage] = useState('');

  const { golden } = useParams();

  // *Aldo Caamal - Redux
  // const getPostsSelector = useSelector((state) => state.getPosts);
  // const dispatch = useDispatch();
  // const getPostsAction = () => dispatch(getPosts());
  // const logoutUserAction = () => dispatch(logoutUser());

  useEffect(() => {
    if (isAuthenticated()) setUserIsSignedIn(true);

    getUserByGolden(golden).then((data) => {
      setUserGolden(data.golden);
      setUserName(data.name);
      setUserEmail(data.email);
      setUserPix(data.pix);
      setUserWpp(data.wpp);
      setUserWithdraw(data.withdraw);
      setUserBalance(data.balance);
    });
  }, []);

  if (userGolden === undefined) {
    return <Alert color="warning">Carregando...</Alert>;
  }

  const clickSubmit = async (e) => {
    e.preventDefault();
    const user = { userGolden, userName, userEmail, userPix, userWpp };
    const token = JSON.parse(getToken()).token;

    updateUserByGolden(golden, token, user).then((data) => {
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setUserGolden(data.golden);
        setUserName(data.name);
        setUserEmail(data.email);
        setUserPix(data.pix);
        setUserWpp(data.wpp);
        setUserWithdraw(data.withdraw);
        setUserBalance(data.balance);
      }
    });
  };

  const logout = async () => {
    setUserIsSignedIn(false);
    await backendService.signout(() => props.history.replace('/'));
  };

  return (
    <React.Fragment>
      {' '}
      {userIsSignedIn && (
        <Navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="logout-button">
              <NavLink onClick={logout} className="nav-link">
                <div className="row d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon size="lg" icon={faSignOutAlt} />
                  <div> {'Sair'}</div>
                </div>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      )}
      <NavComponent />
      <Container className="main-container">
        <Row>
          <Col>
            <Container className="user-profile-container">
              <img
                className="user-profile"
                src={golden_img}
                alt="user profile"
              />
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Container className="money-container">
                <h6>Saldo disponível</h6>
              </Container>
            </Row>
            <Row>
              <Container className="money-container">
                <h6 className="money-disponivel">R$ {userWithdraw}</h6>
              </Container>
            </Row>
          </Col>
          <Col>
            <Row>
              <Container className="money-container">
                <h6>Saldo pendente</h6>
              </Container>
            </Row>
            <Row>
              <Container className="money-container">
                <h6 className="money-pendente">R$ {userBalance}</h6>
              </Container>
            </Row>
          </Col>
        </Row>
        <Alert
          style={{
            display: errorMessage ? '' : 'none',
          }}
          color="danger"
        ></Alert>
        <Form>
          <hr className="profile-hr" />{' '}
          <Row>
            <Col>
              <FormGroup>
                <Container className="golden-container">
                  <Label>GOLDEN</Label>
                  <Input
                    type="text"
                    placeholder={`${userGolden}`}
                    onChange={(e) => setUserGolden(e.target.value)}
                  />
                </Container>
              </FormGroup>
            </Col>
            <Col>
              <Container className="qrcode-container">
                <QRCode value={'http://localhost:3000/user/' + userGolden} />
              </Container>
            </Col>
          </Row>
          <hr className="profile-hr" />{' '}
          {userIsSignedIn && (
            <>
              <Row>
                <Col>
                  <FormGroup>
                    <Container className="golden-container">
                      <Label>Nome</Label>
                      <Input
                        type="text"
                        placeholder={`${userName}`}
                        onChange={(event) => setUserName(event.target.value)}
                      />
                    </Container>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Container className="golden-container">
                      <Label>E-mail</Label>
                      <Input
                        type="text"
                        placeholder={`${userEmail}`}
                        onChange={(event) => setUserEmail(event.target.value)}
                      />
                    </Container>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Container className="golden-container">
                      <Label>PIX</Label>
                      <Input
                        type="text"
                        placeholder={`${userPix}`}
                        onChange={(event) => setUserPix(event.target.value)}
                      />
                    </Container>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Container className="golden-container">
                      <Label>Telefone Whatsapp</Label>
                      <Input
                        type="text"
                        placeholder={`${userWpp}`}
                        onChange={(event) => setUserWpp(event.target.value)}
                      />
                    </Container>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Container className="editar-button">
                  <button
                    onClick={clickSubmit}
                    className="button1 button1-profile"
                  >
                    Salvar informações
                  </button>
                </Container>
              </Row>
            </>
          )}{' '}
        </Form>
      </Container>
    </React.Fragment>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default Profile;
