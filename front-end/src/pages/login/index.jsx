import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Main, Logo, LoginButton } from './styled';
import context from '../../context';
import logo from '../../images/logo.png';
import FormRender from '../../components/form';
import formValidator from '../../services/formValidator';

const Login = () => {
  const { form, setForm, enableButton, setEnableButton } = useContext(context);
  const { email, password, redirect } = form;

  const logOn = () => {
    // Fazer o fetch para a api e setar o localStorage
    // setForm({ ...form, redirect: !redirect });
    console.log('clicou');
  };

  useEffect(() => {
    const isValid = formValidator(email, password);
    console.log(isValid);
    setEnableButton(isValid);
  }, [email, password, setEnableButton, setForm]);

  return (
    <Main>
      { redirect && <Redirect to="/home" /> }
      <Logo src={ logo } alt="Ícone do aplicativo" />
      <FormRender />
      <LoginButton
        type="button"
        data-testid="common_login__button-login"
        onClick={ logOn }
        disabled={ !enableButton }
      >
        LOGIN
      </LoginButton>
    </Main>
  );
};

export default Login;
