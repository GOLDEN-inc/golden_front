import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/logout";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from "reactstrap";

import firebase from "../../firebase/config";

import "./Nav.css";

const NavbarComponent = (props) => {
    const loginSelector = useSelector((state) => state.login);
    const signupSelector = useSelector((state) => state.signup);
    const [menuState, setMenuState] = useState(false);
    const [userState, setUserState] = useState(null);
    const dispatch = useDispatch();
    const logoutUserAction = () => dispatch(logoutUser());

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        firebase.getUserState().then((user) => {
            setUserState(user);
        });
    });

    const logout = async () => {
        console.log("logout user");
        setUserState(null);
        await logoutUserAction();
        props.history.replace("/");
    };

    let buttons;
    if (
        (loginSelector.user && loginSelector.user.hasOwnProperty("user")) ||
        (signupSelector.user && signupSelector.user.hasOwnProperty("user")) ||
        userState != null
    ) {
        buttons = (
            <React.Fragment>
                <button className="button2" onClick={logout}>
                    Logout
                </button>
            </React.Fragment>
        );
    } else {
        buttons = (
            <React.Fragment>
                <NavLink className="login" href="/login">
                    {" "}
                    Entrar{" "}
                </NavLink>

                <NavLink className="registrar" href="/registrar">
                    {" "}
                    Registrar{" "}
                </NavLink>
            </React.Fragment>
        );
    }

    return (
        <div>
            <Navbar color="dark" light expand="md">
                <Link className="brand-name" to="/">
                    GOLDEN
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink className="link-indicacao" href="/create">
                                {" "}
                                Fazer uma indicação{" "}
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto">{buttons}</Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default withRouter(NavbarComponent);
