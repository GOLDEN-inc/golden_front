import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../firebase/config";

import {
    Container,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button,
} from "reactstrap";

const SignUp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ola");
        // const { email, password } = e.target.elements;
        // try {
        //     firebaseConfig
        //         .auth()
        //         .createUserWithEmailAndPassword(
        //             email.value,
        //             password.value
        //         );
        //     setCurrentUser(true);
        // } catch (error) {
        //     alert(error);
        // }
    };

    if (currentUser) {
        return <Redirect to="/feed" />;
    }

    const validateEmail = () => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    return (
        <Container>
            <h1>Criar um Golden</h1>
            <Form className="form" onSubmit={handleSubmit}>
                <Col>
                    <FormGroup>
                        <Label>Email</Label>
                        {!emailError ? (
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

                        {emailError && (
                            <FormFeedback>
                                E-mail inválido :/
                            </FormFeedback>
                        )}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Senha</Label>
                        <Input
                            name="password"
                            placeholder="Senha"
                        />
                    </FormGroup>
                </Col>
                <Button onClick={validateEmail}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;
