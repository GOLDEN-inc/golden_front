import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/signup";

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
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(true);
    const [error, setError] = useState(false);
    const [routeRedirect, setRedirect] = useState("");
    const dispatch = useDispatch();
    const createUserAction = (email, password) =>
        dispatch(createUser(email, password));

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            console.log("creating user");
            await createUserAction(email, password);
            setRedirect(true);
        }
    };

    const redirectTo = routeRedirect;
    if (redirectTo) {
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
                        <h1 className="company-name">GOLDEN</h1>
                        <p>Indicou. Comprou. Ganhou.</p>
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
                        <Link className="login-link" to="/login">Entrar</Link>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
