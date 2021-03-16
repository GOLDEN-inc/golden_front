import React from "react";

import {
    Container,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Row,
} from "reactstrap";

import Nav from "../Navbar/Nav";

import golden from "../../images/golden_baby.jpg";

import "./Profile.css";

const Profile = () => {
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
                    <Col>.col</Col>
                    <Col>.col</Col>
                </Row>
                <Row>
                    <Col>.col</Col>
                </Row>
                <Row>
                    <Col>.col</Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Profile;
