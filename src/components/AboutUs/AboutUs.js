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

import { Link } from 'react-scroll';

import makese from '../../images/makese.jpg';
import golden_logo from '../../images/golden_logo_rounded_black.jpg';
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
          <img src={golden_logo} alt="Logo GOLDEN" />
        </div>
        <div className="text-center arrow">
          <Link to="about" spy={true} smooth={true}>
            <img
              src={arrow}
              alt="continue"
              style={{
                height: '2rem',
              }}
            />
          </Link>
        </div>
      </Jumbotron>

      <div id="about">
        <Container className="main-text-container">
          <Row>
            <Col>
              <SectionTitle
                title="Construa uma renda passiva com a GOLDEN"
                desc="Indique. Conheça. Ganhe."
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
      </div>
      <section className="section bg-main" id="process">
        <Container className="container-explanation">
          <h3 className="title-explanation">Empresas Parceiras</h3>
        </Container>
        <Container className="conainer-card">
          <Card>
            <CardImg top width="100%" src={makese} alt="makese store" />
            <CardBody>
              <CardTitle tag="h4">MAKE-SE STORE</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Health/Beauty
              </CardSubtitle>
              <CardText tag="h5">
                Compartilhe a loja <em className="emphasis">MAKESE</em> em suas
                redes sociais - utilizando a{' '}
                <em className="emphasis">GOLDEN</em> - e ganhe{' '}
                <em className="emphasis">comissão</em> no valor{' '}
                <em className="emphasis">TOTAL</em> da compra
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
