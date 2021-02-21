import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseConfig from "../../firebase/config";
import logo from "../../images/golden_logo_rounded.png";
import "./Login.css";

import { Container, Col, Form, FormGroup, Input, Row } from "reactstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            firebaseConfig.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error);
        }
    };

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <Row>
                <Col
                    lg={{ size: 6, offset: 3 }}
                    md={{ size: 6, offset: 3 }}
                    sm="6"
                >
                    <Container className="container-forms">
                        <img className="logo-main" src={logo} alt="Logo" />
                        <h1 className="main-title-login">GOLDEN</h1>
                        <Form>
                            <Col sm="12" md={{ size: 8, offset: 2 }}>
                                <FormGroup className="form-input">
                                    <Input
                                        name="email"
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md={{ size: 8, offset: 2 }}>
                                <FormGroup className="form-input">
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <button
                                className="button1 button-singup"
                                onClick={handleSubmit}
                            >
                                Entrar
                            </button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
