import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Nav, NavItem, NavLink } from 'reactstrap';

import { isAuthenticated, getToken } from '../../backendService/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faInfo,
  faSignInAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import './Nav.css';

// import firebase from "../../firebase/config";

const NavbarComponent = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      setUserSignedIn(true);
      setToken(JSON.parse(getToken()).user.golden);
    }
  }, []);

  return (
    <div>
      <nav
        className="navbar fixed-bottom navbar-light nav-background"
        role="navigation"
      >
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            <NavItem>
              <NavLink href="/" className="nav-link">
                <div className="row d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon size="lg" icon={faHome} />
                  <div>Home</div>
                </div>
              </NavLink>
            </NavItem>
            {userSignedIn ? (
              <NavItem>
                {' '}
                <NavLink href={'/user/' + token} className="nav-link">
                  {' '}
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    {' '}
                    <FontAwesomeIcon size="lg" icon={faUser} />{' '}
                    <div>Perfil</div>
                  </div>{' '}
                </NavLink>{' '}
              </NavItem>
            ) : (
              <NavItem>
                <NavLink
                  target="_blank"
                  href="https://www.youtube.com/watch?v=wzuTM0cGw24"
                  className="nav-link"
                >
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <FontAwesomeIcon size="lg" icon={faInfo} />
                    <div>Golden</div>
                  </div>
                </NavLink>
              </NavItem>
            )}{' '}
            {userSignedIn ? (
              <NavItem>
                <NavLink
                  target="_blank"
                  href="https://www.youtube.com/watch?v=wzuTM0cGw24"
                  className="nav-link"
                >
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <FontAwesomeIcon size="lg" icon={faInfo} />
                    <div>Golden</div>
                  </div>
                </NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/entrar" className="nav-link">
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      <FontAwesomeIcon size="lg" icon={faSignInAlt} />
                      <div>Entrar</div>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/registrar" className="nav-link">
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      <FontAwesomeIcon size="lg" icon={faPlus} />
                      <div>Criar Conta</div>
                    </div>
                  </NavLink>
                </NavItem>
              </>
            )}{' '}
          </div>
        </Nav>
      </nav>
    </div>
  );
};
export default withRouter(NavbarComponent);
