import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../../firebase/config";
import "./SignUp.css";
import logo from "../../images/golden_logo_rounded.png";

import {
    Container,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Row,
} from "reactstrap";
import { useEffect } from "react/cjs/react.development";

const SignUp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Validate Email
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }

        // Validate Password
        if (password === "") {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }, [email, password]);

    const handleSubmit = (e) => {
        if (validateFields()) {
            e.preventDefault();
            try {
                firebaseConfig
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                setCurrentUser(true);
            } catch (error) {
                alert(error);
            }
        }
    };

    if (currentUser) {
        return <Redirect to="/" />;
    }

    const validateFields = () => {
        if (emailError === false && passwordError === false) {
            setError(false);
            return true;
        }
        setError(true);
        return false;
    };

    return (
        <Container className="general-container">
            <Row>
                <Col sm="12" lg="6">
                    <Container className="company-container">
                        <img className="logo-main" src={logo} alt="Logo" />
                        <h1>GOLDEN</h1>
                        <p>Venha fazer parte dessa rede.</p>
                    </Container>
                </Col>
                <Col sm="12" lg="6">
                    <Container className="container-forms">
                        <h4 className="forms-title">Cadastre-se</h4>
                        <Form>
                            <Col sm="12" md={{ size: 8, offset: 2 }}>
                                <FormGroup className="form-input">
                                    {!emailError || !error ? (
                                        <Input
                                            name="email"
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                        />
                                    ) : (
                                        <Input
                                            invalid
                                            name="email"
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                        />
                                    )}

                                    {emailError && error && (
                                        <FormFeedback>
                                            E-mail inválido :/
                                        </FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col sm="12" md={{ size: 8, offset: 2 }}>
                                <FormGroup className="form-input">
                                    {!passwordError || !error ? (
                                        <Input
                                            name="password"
                                            type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                        />
                                    ) : (
                                        <Input
                                            invalid
                                            name="password"
                                            type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                        />
                                    )}
                                    {passwordError && error && (
                                        <FormFeedback>
                                            Não pode ser vazio :/
                                        </FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <button
                                className="button1 button-singup"
                                onClick={handleSubmit}
                            >
                                Criar!
                            </button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
