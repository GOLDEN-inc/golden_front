import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import logo from "../../images/golden_logo_rounded.png";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { loginUser } from "../../actions/login";
import { useDispatch } from "react-redux";

import "./Login.css";

import { Container, Col, Form, FormGroup, Input, Row } from "reactstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();
    const logInUserAction = (email, password) =>
        dispatch(loginUser(email, password));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            console.log("login user in");
            let user = await logInUserAction(email, password);
            if (user) {
                setRedirect(true);
            }
        } else {
            console.log("need to fill the credentials");
        }
    };

    const redirectTo = redirect;
    if (redirect) {
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
                        <Form onSubmit={handleSubmit}>
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
                            <button className="button1 button-singup">
                                Entrar
                            </button>
                        </Form>
                        <Link className="registrar-link" to="/registrar">Cadastre-se</Link>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
