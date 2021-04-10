import React from 'react';
import Nav from '../Navbar/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Jumbotron,
} from 'reactstrap';

import makese from '../../images/makse.jpeg';
import golden_logo from '../../images/golden_logo_rounded.png';
import arrow from '../../images/arrow-down-white.png';

import SectionTitle from './SectionTitle';

import './AboutUs.css';
import { faAngleDown, faSortDown } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  const openLink = (link) => {
    window.open(link, '_blank');
  };

  return (
    <React.Fragment>
      <Nav />
      <Jumbotron>
        <h1 className="text-center home-title">GOLDEN</h1>
        <hr className="styled-hr" />{' '}
        <div className="fill">
          <img src={golden_logo} alt="" />
        </div>
        <div className="text-center arrow">
          <img
            src={arrow}
            alt="continue"
            style={{
              height: '2rem',
            }}
          />
        </div>
      </Jumbotron>

      <React.Fragment>
        <Container className="main-text-container">
          <Row>
            <Col>
              <SectionTitle
                title="Indicações feitas pelos nossos influenciadores"
                desc="Indique. Conheça. Ganhe Descontos."
              />
            </Col>
          </Row>
          <hr className="line"></hr>
        </Container>
      </React.Fragment>
      <section className="section bg-main" id="process">
        <Container className="container-explanation">
          <h3 className="title-explanation">Empresas Parceiras</h3>
        </Container>
        <Container className="conainer-card">
          <Card>
            <CardImg top width="100%" src={makese} alt="makese store" />
            <CardBody>
              <CardTitle tag="h5">MAKE-SE STORE</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Health/Beauty
              </CardSubtitle>
              <CardText>
                Compartilhe o seu GOLDEN e ganhe{' '}
                <em className="emphais">10%</em> de comissão no valor{' '}
                <em className="emphais">TOTAL</em> da compra
              </CardText>
              <button
                onClick={openLink('https://www.instagram.com/Makesestore/')}
                className="button1"
              >
                Conheça
              </button>
            </CardBody>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
