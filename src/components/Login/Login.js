import React, {useState, useEffect} from "react";

import {Redirect, Link} from "react-router-dom";
import backendService from "../../backendService"

// *Aldo Caamal - Redux
// import { useDispatch } from "react-redux";
// import {loginUser} from "../../actions/login";


import "./Login.css";

import {
    Alert,
    Container,
    Col,
    Form,
    FormGroup,
    Input,
    Row
} from "reactstrap";

const Login = () => {
    // Login component

    // User email
    const [email, setEmail] = useState("");

    // User password
    const [password, setPassword] = useState("");

    // With successfull signin user should be redirected
    const [redirect, setRedirect] = useState(false);

    // User error message
    const [errorMessage, setErrorMessage] = useState("")

    const [loading, setLoading] = useState(false)
    const [recaptcha, setRecaptcha] = useState(false)

    // *Aldo Caamal - Redux
    // const dispatch = useDispatch();
    // const logInUserAction = (email, password) => dispatch(loginUser(email, password));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            setLoading(true)
            await backendService.signin(email, password).then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                    setLoading(false)
                } else { // authenticate
                    backendService.authenticate(data, () => {
                        setRedirect(true)
                    });
                }
            });


            // *Aldo Caamal - Redux
            // let user = await logInUserAction(email, password);
            // if (user) {
            //     setRedirect(true);
            // }
        } else {
            setErrorMessage("É preciso preencher os campos!");
        }
    };

    useEffect(() => {
        setErrorMessage("")
    }, [email, password])

    const redirectTo = redirect;
    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (<Container>
        <Row>
            <Col lg={
                    {
                        size: 6,
                        offset: 3
                    }
                }
                md={
                    {
                        size: 8,
                        offset: 2
                    }
            }>
                <Container className="container-forms">
                    <img className="logo-main" src="https://firebasestorage.googleapis.com/v0/b/golden-ef7d8.appspot.com/o/golden_logo_rounded.png?alt=media&token=673d0fac-b898-43b4-bd36-c5374c8fdda2" alt="Logo"/>
                    <h1 className="main-title-login">GOLDEN</h1>
                    <Alert style={
                            {
                                display: errorMessage ? "" : "none"
                            }
                        }
                        color="danger"> {errorMessage} </Alert>

                    <Form onSubmit={handleSubmit}>
                        <Col sm="12"
                            md={
                                {
                                    size: 8,
                                    offset: 2
                                }
                        }>
                            <FormGroup className="form-input">
                                <Input name="email" placeholder="E-mail"
                                    value={email}
                                    onChange={
                                        (event) => setEmail(event.target.value)
                                    }/>
                            </FormGroup>
                        </Col>
                        <Col sm="12"
                            md={
                                {
                                    size: 8,
                                    offset: 2
                                }
                        }>
                            <FormGroup className="form-input">
                                <Input name="password" type="password" placeholder="Senha"
                                    value={password}
                                    onChange={
                                        (event) => setPassword(event.target.value)
                                    }/>
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
    </Container>);
};

export default Login;
