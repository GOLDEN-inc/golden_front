import React, { useState } from "react";

import {
    Container,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Row,
    Label,
} from "reactstrap";

import Nav from "../Navbar/Nav";
import QRCode from "qrcode.react";

import golden from "../../images/golden_baby.jpg";

import "./Profile.css";

const Profile = () => {
    const [goldenInput, setGoldenInput] = useState("");

    const editProfile = () => {};

    return (
        <React.Fragment>
            <Nav />
            <Container>
                <Row>
                    <Col>
                        <Container className="user-profile-container">
                            <img
                                className="user-profile"
                                src={golden}
                                alt="user profile"
                            />
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Container className="editar-button">
                        <button
                            className="button1 button1-profile"
                            onClick={(e) => editProfile()}
                        >
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
                                    <Input
                                        type="text"
                                        placeholder="Daphne"
                                        onChange={(e) =>
                                            setGoldenInput(e.target.value)
                                        }
                                    />
                                </Container>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col>
                        <Container className="qrcode-container">
                            <QRCode value={goldenInput} />
                        </Container>
                    </Col>
                </Row>
                <hr className="profile-hr" />
                <Row>
                    <Col>
                        <Container>
                            <Form>
                                <FormGroup>
                                    <Container>
                                        <Label className="label-center">
                                            PIX
                                        </Label>
                                        <Input
                                            type="text"
                                            placeholder="XXX.XXX.XXX-XX"
                                        />
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
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Profile;
