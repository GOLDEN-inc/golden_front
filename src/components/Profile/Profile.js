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

import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

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

  // Flag
  const [dataUpdateSuccess, setDataUpdateSuccess] = useState(false);
  const [dataUpdateFail, setDataUpdateFail] = useState(false);

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

  useEffect(() => {
    // Set Error Message to Empty and SignIn state to false
    setErrorMessage('');
  }, [userGolden, userName]);

  if (userGolden === undefined) {
    return <Alert color="warning">Carregando...</Alert>;
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = { userGolden, userName, userEmail, userPix, userWpp };
    const token = JSON.parse(getToken()).token;

    updateUserByGolden(golden, token, user).then((data) => {
      if (data.error) {
        setErrorMessage(data.error);
        setDataUpdateFail(true);
      } else {
        setDataUpdateSuccess(true);
        setTimeout(() => {
          setDataUpdateSuccess(false);
        }, 3000);
        backendService.updateAuthenticate(data.user.golden, () => {
          props.history.replace(`./${userGolden}`);
        });
      }
    });
  };

  const clickCancel = (e) => {
    e.preventDefault();
    window.location.reload(); //page reload
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
      {!userIsSignedIn && (
        <>
          <br />
          <br />
          <br />
        </>
      )}
      <NavComponent />
      <Container className="main-container">
        {/* <Row>
          <Col>
            <Container className="user-profile-container">
              <img
                className="user-profile"
                src={golden_img}
                alt="user profile"
              />
            </Container>
          </Col>
        </Row> */}
        {userIsSignedIn && (
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
        )}
        <Form>
          {!userIsSignedIn && (
            <>
              <hr className="styled-hr" />{' '}
              <Row>
                <Col>
                  <FormGroup>
                    <Container className="golden-container">
                      <Label>GOLDEN</Label>
                      <Input
                        disabled
                        type="text"
                        placeholder={`${userGolden}`}
                      />
                    </Container>
                  </FormGroup>
                </Col>
                <Col>
                  <Container className="qrcode-container">
                    <QRCode value={window.location.href} />
                  </Container>
                </Col>
              </Row>
              <hr className="styled-hr" />{' '}
              <Row>
                <Container className="golden-social-network">
                  <p>
                    Compartilhe este <em className="emphasis">GOLDEN</em> nas
                    redes sociais!
                  </p>
                </Container>
              </Row>
              <Row>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <TwitterShareButton
                      url={window.location.href}
                      title="Utilize este GOLDEN e ganhe descontos!"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <FacebookShareButton
                      url={window.location.href}
                      title="Utilize este GOLDEN e ganhe descontos!"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <WhatsappShareButton
                      url={window.location.href}
                      title="Utilize este GOLDEN e ganhe descontos!"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <LinkedinShareButton
                      url={window.location.href}
                      title="Utilize este GOLDEN e ganhe descontos!"
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <TelegramShareButton
                      url={window.location.href}
                      title="Utilize este GOLDEN e ganhe descontos!"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                  </Container>
                </Col>
              </Row>
              <hr className="styled-hr" />{' '}
            </>
          )}
          {userIsSignedIn && (
            <>
              <hr className="styled-hr" />{' '}
              <Row>
                <Col>
                  <FormGroup>
                    <Container className="golden-container">
                      <Label>GOLDEN</Label>
                      <Input
                        type="text"
                        placeholder={`${userGolden}`}
                        onChange={(event) =>
                          setUserGolden(event.target.value.toLowerCase())
                        }
                      />
                    </Container>
                  </FormGroup>
                </Col>
                <Col>
                  <Container className="qrcode-container">
                    <QRCode value={window.location.href} />
                  </Container>
                </Col>
              </Row>
              <hr className="styled-hr" />{' '}
              <Row>
                <Container className="golden-social-network">
                  <p>
                    Compartilhe o seu <em className="emphasis">GOLDEN</em> nas
                    redes sociais!
                  </p>
                </Container>
              </Row>
              <Row>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <TwitterShareButton
                      url={window.location.href}
                      title="Utilize o meu GOLDEN e ganhe descontos!"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <FacebookShareButton
                      url={window.location.href}
                      title="Utilize o meu GOLDEN e ganhe descontos!"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <WhatsappShareButton
                      url={window.location.href}
                      title="Utilize o meu GOLDEN e ganhe descontos!"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <LinkedinShareButton
                      url={window.location.href}
                      title="Utilize o meu GOLDEN e ganhe descontos!"
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </Container>
                </Col>
                <Col xs={{ size: 2 }}>
                  <Container className="icons-container">
                    <TelegramShareButton
                      url={window.location.href}
                      title="Utilize o meu GOLDEN e ganhe descontos!"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                  </Container>
                </Col>
              </Row>
              <hr className="styled-hr" />{' '}
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
              <div className="alert">
                <Alert
                  style={{
                    display: errorMessage ? '' : 'none',
                  }}
                  color="danger"
                >
                  {errorMessage}
                </Alert>
                <Alert
                  style={{
                    display: dataUpdateSuccess ? '' : 'none',
                  }}
                  color="warning"
                >
                  Dados atualizados com sucesso!
                </Alert>
              </div>
              <Row>
                <Col>
                  <Row>
                    {dataUpdateFail && (
                      <Container className="editar-button">
                        <button
                          onClick={clickCancel}
                          className="buttonWarning button1-profile"
                        >
                          Cancelar edição
                        </button>
                      </Container>
                    )}
                  </Row>
                </Col>
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
