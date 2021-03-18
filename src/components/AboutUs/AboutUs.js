import React from "react";
import Nav from "../Navbar/Nav";

import ReactTextRotator from "react-text-rotator";

import { Container, Row, Col } from "reactstrap";

import arrow from "../../images/arrow-down-white.png";
import golden from "../../images/golden_baby.jpg";

import SectionTitle from "./SectionTitle";

import "./AboutUs.css"

const AboutUs = () => {
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
                    <Row>
                        <Col md={6}>
                            <p className="main-text">
                                Cada post possui uma indicação.
                            </p>
                        </Col>
                        <Col md={6}>
                            <p className="main-text">
                                Clique no post que tiver interesse.
                            </p>
                        </Col>
                        <Col md={6}>
                            <p className="main-text">
                                Descubra um local ou um produto novo.
                            </p>
                        </Col>
                        <Col md={6}>
                            <p className="main-text">
                                Além de ganhar um GOLDEN de desconto em lojas
                                parceiras.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default AboutUs;
