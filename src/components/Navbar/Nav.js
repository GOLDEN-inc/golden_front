import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/logout";

import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

import firebase from "../../firebase/config";

import "./Nav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faHome,
    faUser,
    faCamera,
    faShare,
    faInfo,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
    {
        route: "/",
        icon: faHome,
        label: "Home",
    },
    {
        route: "/search",
        icon: faSearch,
        label: "Pesquisa",
    },
    {
        route: "/profile",
        icon: faUser,
        label: "Perfil",
    },
    {
        route: "/create",
        icon: faCamera,
        label: "Indicação",
    },
    {
        route: "/aboutus",
        icon: faInfo,
        label: "Sobre Nós",
    },
];

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
            <Container>
                <NavItem>
                    <NavLink href="/profile">
                        <FontAwesomeIcon className="profile-icon" icon="user" />
                    </NavLink>
                </NavItem>
                <NavItem>
                    <button className="logout-nav button2" onClick={logout}>
                        Logout
                    </button>
                </NavItem>
            </Container>
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
            <nav className="navbar fixed-bottom navbar-light nav-background" role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {tabs.map((tab, index) => (
                            <NavItem key={`tab-${index}`}>
                                <NavLink
                                    href={tab.route}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <FontAwesomeIcon
                                            size="lg"
                                            icon={tab.icon}
                                        />
                                        <div>{tab.label}</div>
                                    </div>
                                </NavLink>
                            </NavItem>
                        ))}
                    </div>
                </Nav>
            </nav>
        </div>
    );
};

export default withRouter(NavbarComponent);
