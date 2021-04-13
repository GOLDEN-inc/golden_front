import React from 'react';
import Nav from '../Navbar/Nav';

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

import makese from '../../images/makese.png';
import golden_logo from '../../images/golden_logo_rounded.png';
import arrow from '../../images/arrow-down-white.png';
import instructions from '../../images/instructions.png';

import SectionTitle from './SectionTitle';

import './AboutUs.css';

const AboutUs = () => {
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
          <Row>
            <Container style={{ textAlign: 'center' }}>
              <img
                style={{ width: '90%' }}
                src={instructions}
                alt="instruções"
              />
            </Container>
          </Row>
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
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/Makesestore/"
                className="button1"
              >
                Conheça
              </a>
            </CardBody>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
