import React, {useState, useEffect} from "react";
import {Redirect, Link} from "react-router-dom";
import backendService from "../../backendService"


// *Aldo Caamal - Redux
// import {useSelector, useDispatch} from "react-redux";
// import {createUser} from "../../actions/signup";

import "./SignUp.css";

import {
    Alert,
    Container,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Row
} from "reactstrap";

const SignUp = () => {
    // SignUp Component

    // Name
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(true);

    // Golden
    const [golden, setGolden] = useState("");
    const [goldenError, setGoldenError] = useState(true);

    // Email
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);

    // Password
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(true);

    // Pix
    const [pix, setPix] = useState("");
    const [pixError, setPixError] = useState(true);

    // Telefone
    const [cell, setCell] = useState("");
    const [cellError, setCellError] = useState(true);

    // Keep track of errors in the form
    const [error, setError] = useState(false)
    const [routeRedirect, setRedirect] = useState("")

    // User error message
    const [errorMessage, setErrorMessage] = useState("")

    // Succesfull signin messgae
    const [signInSuccess, setSignInSuccess] = useState(false)


    // *Aldo Caamal - Redux
    // const dispatch = useDispatch();
    // const createUserAction = (email, password, name, golden, pix, cell) => dispatch(createUser(email, password, name, golden, pix, cell));

    useEffect(() => {
        //

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

        // Validate Golden
        if (golden === "") {
            setGoldenError(true);
        } else {
            setGoldenError(false);
        }

        // Validate Name
        if (name === "") {
            setNameError(true);
        } else {
            setNameError(false);
        }

        // Validate PIX
        if (pix === "") {
            setPixError(true);
        } else {
            setPixError(false);
        }

        // Validate Cellphone
        if (cell === "") {
            setCellError(true);
        } else {
            setCellError(false);
        }

        // Set Error Message to Empty and SignIn state to false
        setErrorMessage("")
    }, [
        email,
        password,
        name,
        golden,
        pix,
        cell
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            await backendService.signup(email, password, name, golden, pix, cell).then(data => {

                if (data.error) {
                    setErrorMessage(data.error)

                } else {
                    setName("")
                    setEmail("")
                    setPassword("")
                    setGolden("")
                    setCell("")
                    setPix("")
                    setSignInSuccess(true)
                }
            });

            // *Aldo Caamal - Redux
            // await createUserAction(email, password, name, golden, pix, cell)
        }
    };

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/"/>;
    }

    const validateFields = () => {
        if (emailError === false && passwordError === false && nameError === false && goldenError === false && pixError === false && cellError === false) {
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
                        <img className="logo-main" src="https://firebasestorage.googleapis.com/v0/b/golden-ef7d8.appspot.com/o/golden_logo_rounded.png?alt=media&token=673d0fac-b898-43b4-bd36-c5374c8fdda2" alt="Logo"/>
                        <h1 className="company-name">GOLDEN</h1>
                        <p>Indicou. Comprou. Ganhou.</p>
                    </Container>
                </Col>
                <Col sm="12" lg="6">
                    <Container className="container-forms">
                        <h4 className="forms-title">Cadastre-se.</h4>
                        <Alert style={
                                {
                                    display: errorMessage ? "" : "none"
                                }
                            }
                            color="danger">

                            {errorMessage} </Alert>

                        <Alert style={
                                {
                                    display: signInSuccess ? "" : "none"
                                }
                            }
                            color="warning">
                            Bem-vindo a GOLDEN!
                            <br/>
                            Por favor, faça o login.
                        </Alert>


                        <Form onSubmit={handleSubmit}>
                            <Col sm="12"
                                md={
                                    {
                                        size: 8,
                                        offset: 2
                                    }
                            }>
                                <FormGroup className="form-input">
                                    {
                                    !nameError || !error ? (
                                        <Input name="name" placeholder="Nome"
                                            value={name}
                                            onChange={
                                                (event) => setName(event.target.value)
                                            }/>
                                    ) : (
                                        <Input invalid name="name" placeholder="Nome"
                                            value={name}
                                            onChange={
                                                (event) => setName(event.target.value)
                                            }/>
                                    )
                                }

                                    {
                                    nameError && error && (
                                        <FormFeedback>
                                            Nome não pode ser vazio!
                                        </FormFeedback>
                                    )
                                } </FormGroup>
                            </Col>
                            <Col sm="12"
                                md={
                                    {
                                        size: 8,
                                        offset: 2
                                    }
                            }>
                                <FormGroup className="form-input">
                                    {
                                    !goldenError || !error ? (
                                        <Input name="golden" placeholder="Nome de usuário: usuario123"
                                            value={golden}
                                            onChange={
                                                (event) => setGolden(event.target.value)
                                            }/>
                                    ) : (
                                        <Input invalid name="golden" placeholder="Nome de usuário: usuario123"
                                            value={golden}
                                            onChange={
                                                (event) => setGolden(event.target.value)
                                            }/>
                                    )
                                }

                                    {
                                    goldenError && error && (
                                        <FormFeedback>
                                            Golden não pode ser vazio!
                                        </FormFeedback>
                                    )
                                } </FormGroup>
                            </Col>
                            <Col sm="12"
                                md={
                                    {
                                        size: 8,
                                        offset: 2
                                    }
                            }>
                                <FormGroup className="form-input">
                                    {
                                    !emailError || !error ? (
                                        <Input name="email" placeholder="E-mail"
                                            value={email}
                                            onChange={
                                                (event) => setEmail(event.target.value)
                                            }/>
                                    ) : (
                                        <Input invalid name="email" placeholder="E-mail"
                                            value={email}
                                            onChange={
                                                (event) => setEmail(event.target.value)
                                            }/>
                                    )
                                }

                                    {
                                    emailError && error && (
                                        <FormFeedback>
                                            E-mail inválido.
                                        </FormFeedback>
                                    )
                                } </FormGroup>
                            </Col>
                            <Col sm="12"
                                md={
                                    {
                                        size: 8,
                                        offset: 2
                                    }
                            }>
                                <FormGroup className="form-input">
                                    {
                                    !passwordError || !error ? (
                                        <Input name="password" type="password" placeholder="Senha"
                                            value={password}
                                            onChange={
                                                (event) => setPassword(event.target.value)
                                            }/>
                                    ) : (
                                        <Input invalid name="password" type="password" placeholder="Senha"
                                            value={password}
                                            onChange={
                                                (event) => setPassword(event.target.value)
                                            }/>
                                    )
                                }
                                    {
                                    passwordError && error && (
                                        <FormFeedback>
                                            Senha não pode estar vazia.
                                        </FormFeedback>
                                    )
                                } </FormGroup>
                            </Col>
                            <Col sm="12"
                                md={
                                    {
                                        size: 8,
                                        offset: 2
                                    }
                            }>
                                <FormGroup className="form-input">
                                    {
                                    !cellError || !error ? (
                                        <Input name="cell" placeholder="Telefone: (61)99999-5555"
                                            value={cell}
                                            onChange={
                                                (event) => setCell(event.target.value)
                                            }/>
                                    ) : (< Input invalid name = "cell" placeholder = "Telefone: (61)99999-5555" value =
                                        { cell
                                    }
                                    onChange =
                                        {( event) => setCell(event.target.value)

                                    } />)
                                }

                                    {
                                    cellError && error && (
                                        <FormFeedback>
                                            O campo de telefone não pode ser vazio!
                                        </FormFeedback>
                                    )
                                } </FormGroup>
                            </Col>
                            <Col sm="12"
                                md={
                                    {
                                        size: 8,
                                        offset: 2
                                    }
                            }>
                                <FormGroup className="form-input">
                                    {
                                    !pixError || !error ? (
                                        <Input name="pix" placeholder="PIX: cpf, telefone, email..."
                                            value={pix}
                                            onChange={
                                                (event) => setPix(event.target.value)
                                            }/>
                                    ) : (< Input invalid name = "pix" placeholder = "PIX: cpf, telefone, email..." value =

                                        { pix
                                    }
                                    onChange =
                                        {( event) => setPix(event.target.value)

                                    } />)
                                }

                                    {
                                    pixError && error && (
                                        <FormFeedback>
                                            O campo PIX não pode ser vazio!
                                        </FormFeedback>
                                    )
                                } </FormGroup>
                            </Col>

                            <button className="button1 button-singup">
                                Criar
                            </button>
                        </Form>
                        <Link className="login-link" to="/login">
                            Entrar
                        </Link>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
