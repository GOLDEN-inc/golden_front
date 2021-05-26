import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../backendService/index';

import './styles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const forgotPasswordFunc = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');
    forgotPassword(email).then((data) => {
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setMessage(data.message);
      }
    });
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">
        Enviar link de <span>resetar senha</span>
      </h2>

      {message && <h4 className="success-message">{message}</h4>}
      {errorMessage && <h4 className="warning-message">{errorMessage}</h4>}

      <form>
        <div className="form-group mt-5">
          <input
            type="email"
            className="form-control"
            placeholder="Your email address"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage('');
              setMessage('');
            }}
            autoFocus
          />
        </div>
        <button onClick={(e) => forgotPasswordFunc(e)} className="button1">
          Enviar Link
        </button>
        <Link className="login-link" to="/entrar">
          Cancelar
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
