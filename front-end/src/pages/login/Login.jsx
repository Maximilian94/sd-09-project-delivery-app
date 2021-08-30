import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAPI } from '../../services/loginAPI';

function Login() {
  const [isValidFields, setIsValidFields] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordminLength = 6;
  const history = useHistory();

  useEffect(() => {
    const isDisabled = email.match(/\S+@\S+\.\S+/)
      && password.length >= passwordminLength;

    setIsButtonDisabled(!isDisabled);
  }, [email, password]);

  const canUserLogin = async () => {
    const loginBody = { email, password };
    const responseLogin = await loginAPI(loginBody);
    console.log(responseLogin);
    if (responseLogin.message === 'Invalid fields') {
      return setIsValidFields(false);
    }
    if (responseLogin.token) {
      return history.push('/customer/products');
    }
  };

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        canUserLogin();
      } }
    >
      {!isValidFields ? (
        <div data-testid="common_login__element-invalid-email">
          <p>Email ou senha incorreto</p>
        </div>
      ) : null}
      <div className="login-input">
        <label htmlFor="email">
          Login:
          <input
            type="email"
            name="email"
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="common_login__input-email"
            placeholder="exemplo@exemplo.com"
            required
          />
        </label>
      </div>
      <div className="login-input">
        <label htmlFor="name">
          Senha
          <input
            type="password"
            name="password"
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="common_login__input-password"
            placeholder="Barak Obama"
            required
          />
        </label>
      </div>
      <button
        type="submit"
        data-testid="common_login__button-login"
        disabled={ isButtonDisabled }
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        AINDA NÃO TENHO CONTA
      </button>
    </form>
  );
}

export default Login;
