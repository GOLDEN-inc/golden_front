import React, { useEffect, useState } from 'react';
import backendService from '../../backendService';
import {
  getUserByGolden,
  updateUserByGolden,
  getAllUsers,
} from '../../backendService/user';
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
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
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
    if (isAuthenticated()) {
      setUserIsSignedIn(true);
    }

    try {
      const token = JSON.parse(getToken()).token;

      getUserByGolden(golden, token).then((data) => {
        setUserGolden(data.golden);
        setUserName(data.name);
        setUserEmail(data.email);
        setUserPix(data.pix);
        setUserWpp(data.wpp);
        setUserWithdraw(data.withdraw);
        setUserBalance(data.balance);
      });
    } catch (e) {
      setUserIsSignedIn(false);
      getAllUsers().then((data) => {
        let user_data = data.users.find((element) => element.golden === golden);
        setUserGolden(user_data.golden);
        setUserName(user_data.name);
      });
    }
  }, []);

  useEffect(() => {
    // Set Error Message to Empty and SignIn state to false
    setErrorMessage('');
  }, [userGolden, userName]);

  if (userGolden === undefined) {
    return <Alert color="warning">Carregando...</Alert>;
  }

  if (userEmail === undefined || userIsSignedIn === false) {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <NavComponent />
        <Form>
          <h1 className="text-center home-title">GOLDEN</h1>
          <hr className="styled-hr" />
          <h4 className="text-center">{userName}</h4>
          <br />
          <Row>
            <Col>
              <FormGroup>
                <Container className="golden-container">
                  <Label>GOLDEN</Label>
                  <Input disabled type="text" placeholder={`${userGolden}`} />
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
                Compartilhe este <em className="emphasis">CUPOM</em> nas redes
                sociais!
              </p>
            </Container>
          </Row>
          <Row className="row-icons">
            <Col>
              <Container className="icons-container">
                <TwitterShareButton
                  url="https://www.instagram.com/Makesestore/"
                  title={`Utilize este CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <FacebookShareButton
                  url="https://www.instagram.com/Makesestore/"
                  title={`Utilize este CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <FacebookMessengerShareButton
                  url="https://www.instagram.com/Makesestore/"
                  title={`Utilize este CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </Container>
            </Col>
          </Row>
          <Row className="row-icons">
            <Col>
              <Container className="icons-container">
                <WhatsappShareButton
                  url="https://www.instagram.com/Makesestore/"
                  title={`Utilize este CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <LinkedinShareButton
                  url="https://www.instagram.com/Makesestore/"
                  title={`Utilize este CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <TelegramShareButton
                  url="https://www.instagram.com/Makesestore/"
                  title={`Utilize este CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </Container>
            </Col>
          </Row>
          <hr className="styled-hr" />{' '}
          <Row>
            <Container className="doubt-container doubt-container-no-signin">
              <p>
                Quer saber mais como construir uma{' '}
                <em className="emphasis">renda passiva</em> com a{' '}
                <em className="emphasis">GOLDEN</em> ?
              </p>
              <br />
              <a
                className="whatsapp-share-button"
                href="https://wa.me/5561992820353?text=Oi%2C%20GOLDEN%21%20%0AQuero%20come%C3%A7ar%20a%20ganhar%20dinheiro%20agora%21%20Como%20eu%20fa%C3%A7o%3F"
                target="_blank"
                rel="noreferrer"
              >
                Saber mais!
              </a>
            </Container>
          </Row>
        </Form>
      </React.Fragment>
    );
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
        }, 2600);
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
      <NavComponent />
      <Container>
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
          <>
            <Row>
              <Col>
                <Row>
                  <Container className="money-container">
                    <h6>Saldo dispon??vel</h6>
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
            <Row>
              <Container className="doubt-container">
                <br />
                <a
                  className="whatsapp-share-button"
                  href={`https://wa.me/5561992820353?text=Oi%2C%20GOLDEN%21%0AQuero%20retirar%20o%20meu%20dinheiro.%0AMeu%20GOLDEN%20-%20${golden}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Retirar o meu dinheiro
                </a>
                <br />
                <br />
              </Container>
            </Row>
          </>
        )}
        <Form>
          {userIsSignedIn && (
            <>
              <hr className="styled-hr" />{' '}
              <Row>
                <Col>
                  <FormGroup>
                    <Container className="golden-container">
                      <Label>GOLDEN</Label>
                      <p style={{ fontSize: '0.8rem' }}>
                        O GOLDEN nada mais ?? do que o seu{' '}
                        <em className="emphasis">CUPOM</em>
                      </p>
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
                    Compartilhe o seu <em className="emphasis">CUPOM</em> nas
                    redes sociais!
                  </p>
                  <p>
                    E ganhe <em className="emphasis">DINHEIRO</em> para cada
                    compra realizada utilizando o seu CUPOM em nossas lojas
                    parceiras.
                  </p>
                </Container>
              </Row>
              <Row className="row-icons">
                <Col>
                  <Container className="icons-container">
                    <TwitterShareButton
                      url="https://www.instagram.com/Makesestore/"
                      title={`Utilize o meu CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </Container>
                </Col>
                <Col>
                  <Container className="icons-container">
                    <FacebookShareButton
                      url="https://www.instagram.com/Makesestore/"
                      title={`Utilize o meu CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </Container>
                </Col>
                <Col>
                  <Container className="icons-container">
                    <FacebookMessengerShareButton
                      url="https://www.instagram.com/Makesestore/"
                      title={`Utilize o meu CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                    >
                      <FacebookMessengerIcon size={32} round />
                    </FacebookMessengerShareButton>
                  </Container>
                </Col>
              </Row>
              <Row className="row-icons">
                <Col>
                  <Container className="icons-container">
                    <WhatsappShareButton
                      url="https://www.instagram.com/Makesestore/"
                      title={`Utilize o meu CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </Container>
                </Col>
                <Col>
                  <Container className="icons-container">
                    <LinkedinShareButton
                      url="https://www.instagram.com/Makesestore/"
                      title={`Utilize o meu CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </Container>
                </Col>
                <Col>
                  <Container className="icons-container">
                    <TelegramShareButton
                      url="https://www.instagram.com/Makesestore/"
                      title={`Utilize o meu CUPOM - ${golden} - e ganhe 5% de desconto na loja MAKESE`}
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
                        onChange={(event) =>
                          setUserEmail(event.target.value.toLowerCase())
                        }
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
                          Cancelar edi????o
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
                    Salvar informa????es
                  </button>
                </Container>
              </Row>
              <hr className="styled-hr" />{' '}
            </>
          )}{' '}
        </Form>
        {userIsSignedIn && (
          <Row>
            <Container className="doubt-container">
              <p>
                Ficou com d??vidas de como{' '}
                <em className="emphasis">ganhar dinheiro</em> ?
              </p>
              <p>Pe??a ajuda!</p>
              <br />
              <a
                className="whatsapp-share-button"
                href="https://wa.me/5561992820353?text=Oi%2C%20GOLDEN%21%20%0AMe%20ajude%20por%20favor."
                target="_blank"
                rel="noreferrer"
              >
                Me ajude!
              </a>
              <br />
              <br />
            </Container>
          </Row>
        )}
      </Container>
      {userIsSignedIn && (
        <Container className="bottom-section">
          <Row className="row-icons">
            <Container className="golden-social-network">
              <p className="text-white">
                Compartilhe a <em className="emphasis">GOLDEN</em> com os seus
                amigos!
              </p>
            </Container>
            <Col>
              <Container className="icons-container">
                <TwitterShareButton
                  url={window.location.href}
                  title="Conhe??a o meu perfil da GOLDEN! Uma empresa que me paga por indicar experi??ncias."
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <FacebookShareButton
                  url={window.location.href}
                  title="Conhe??a o meu perfil da GOLDEN! Uma empresa que me paga por indicar experi??ncias."
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <FacebookMessengerShareButton
                  url={window.location.href}
                  title="Conhe??a o meu perfil da GOLDEN! Uma empresa que me paga por indicar experi??ncias."
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </Container>
            </Col>
          </Row>
          <Row className="row-icons">
            <Col>
              <Container className="icons-container">
                <WhatsappShareButton
                  url={window.location.href}
                  title="Conhe??a o meu perfil da GOLDEN! Uma empresa que me paga por indicar experi??ncias."
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <LinkedinShareButton
                  url={window.location.href}
                  title="Conhe??a o meu perfil da GOLDEN! Uma empresa que me paga por indicar experi??ncias."
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </Container>
            </Col>
            <Col>
              <Container className="icons-container">
                <TelegramShareButton
                  url={window.location.href}
                  title="Conhe??a o meu perfil da GOLDEN! Uma empresa que me paga por indicar experi??ncias."
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default Profile;
