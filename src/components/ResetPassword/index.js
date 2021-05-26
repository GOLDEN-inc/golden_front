import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resetPassword } from '../../backendService/index';

import './styles.css';

const ResetPassword = () => {
  let { resetPasswordToken } = useParams();

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetPasswordFunc = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');

    resetPassword({
      newPassword: newPassword,
      resetPasswordLink: resetPasswordToken,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
        setErrorMessage(data.error);
        setErrorMessage(data.error);
      } else {
        console.log(data.message);
        setMessage(data.message);
        setNewPassword('');
      }
    });
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">
        Resete a sua <span>senha</span>
      </h2>

      {message && <h4 className="success-message">{message}</h4>}
      {errorMessage && <h4 className="warning-message">{errorMessage}</h4>}

      <form>
        <div className="form-group mt-5">
          <input
            type="password"
            className="form-control"
            placeholder="Sua nova senha"
            value={newPassword}
            name="newPassword"
            onChange={(e) => {
              setNewPassword(e.target.value);
              setMessage('');
              setErrorMessage('');
            }}
            autoFocus
          />
        </div>
        <button onClick={(e) => resetPasswordFunc(e)} className="button1">
          Resetar Senha
        </button>{' '}
        <Link className="login-link" to="/entrar">
          Voltar
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
