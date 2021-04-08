import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";

import {Nav, NavItem, NavLink} from "reactstrap";

import {isAuthenticated} from "../../backendService/auth";

import "./Nav.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faInfo,
    faSignInAlt,
    // faSearch,
    // faCamera
} from "@fortawesome/free-solid-svg-icons";

// import firebase from "../../firebase/config";

let tabs = [
    {
        route: "/",
        icon: faHome,
        label: "Home"
    }, {
        route: "/profile",
        icon: faUser,
        label: "Perfil"
    }, {
        route: "/aboutus",
        icon: faInfo,
        label: "GOLDEN"
    },
];
// !In future versions such paths should be used
// {
//     route: "/search",
//     icon: faSearch,
//     label: "Pesquisa"
// },
// {
//     route: "/create",
//     icon: faCamera,
//     label: "Indicação"
// }

const NavbarComponent = () => {
    const [userSignedIn, setUserSignedIn] = useState(false);

    useEffect(() => {
        console.log("CUUUU - ", isAuthenticated());
        if (isAuthenticated()) {
            setUserSignedIn(true);
        }
    }, []);

    if (!userSignedIn) {
        tabs.splice(1, 1);
        tabs.push({route: "/login", icon: faSignInAlt, label: "Entrar"});
    }

    return (
        <div>
            <nav className="navbar fixed-bottom navbar-light nav-background" role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        <NavItem>
                            <NavLink href="/" className="nav-link">
                                <div className="row d-flex flex-column justify-content-center align-items-center">
                                    <FontAwesomeIcon size="lg"
                                        icon={faHome}/>
                                    <div>Home</div>
                                </div>
                            </NavLink>
                        </NavItem>
                        {
                        userSignedIn ? (
                            <NavItem> {" "}
                                <NavLink href="/profile" className="nav-link">
                                    {" "}
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        {" "}
                                        <FontAwesomeIcon size="lg"
                                            icon={faUser}/>{" "}
                                        <div>Perfil</div>
                                    </div>
                                    {" "} </NavLink>
                                {" "} </NavItem>
                        ) : (
                            <NavItem>
                                <NavLink href="/" className="nav-link">
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <FontAwesomeIcon size="lg"
                                            icon={faInfo}/>
                                        <div>Golden</div>
                                    </div>
                                </NavLink>
                            </NavItem>
                        )
                    }
                        {" "}
                        {
                        userSignedIn ? (
                            <NavItem>
                                <NavLink href="/" className="nav-link">
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <FontAwesomeIcon size="lg"
                                            icon={faInfo}/>
                                        <div>Golden</div>
                                    </div>
                                </NavLink>
                            </NavItem>
                        ) : (
                            <NavItem>
                                <NavLink href="/login" className="nav-link">
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <FontAwesomeIcon size="lg"
                                            icon={faSignInAlt}/>
                                        <div>Entrar</div>
                                    </div>
                                </NavLink>
                            </NavItem>
                        )
                    }
                        {" "} </div>
                </Nav>
            </nav>
        </div>
    );
};
export default withRouter(NavbarComponent);
