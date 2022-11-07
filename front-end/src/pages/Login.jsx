import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/api';
import { saveUser } from '../services/userLocalStg';
import { UserContext } from '../context/UserContext';

function Login() {
  const history = useHistory();
  const [user, setUser] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorResponse, setErrorResponse] = useState('');
  const { setLoggedUser } = useContext(UserContext);

  const USER_KEY = 'user';
  const loggedUser = JSON.parse(localStorage.getItem(USER_KEY));

  useEffect(() => {
    if (loggedUser) {
      const { role } = loggedUser;
      switch (role) {
      case 'customer':
        return history.push('/customer/products');
      case 'seller':
        return history.push('/seller/orders');
      default: return console.log('Role not found!');
      }
    }
  }, []);

  useEffect(() => {
    const MIN_PASS_LENGTH = 6;
    const emailTest = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    setIsDisabled(!(emailTest.test(user.email)
      && user.password.length >= MIN_PASS_LENGTH));
  }, [user.email, user.password]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(user);
    const { name, email, token, role, message } = response;
    if (message) return setErrorResponse(message);

    saveUser({ name, email, token, role });
    setLoggedUser({ name, email, token, role });
    switch (role) {
    case 'customer':
      return history.push('/customer/products');
    case 'seller':
      return history.push('/seller/orders');
    case 'administrator':
      return history.push('/admin/manage');
    default: return console.log('Role not found!');
    }
  };

  const handleRedirectRegister = async (event) => {
    event.preventDefault();
    history.push('/register');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <Input
          label="Login"
          dataTestId="common_login__input-email"
          type="email"
          name="email"
          value={ user.email }
          onChange={ handleChange }
          placeholder="Type your e-mail"
        />
        <Input
          label="Senha"
          dataTestId="common_login__input-password"
          type="password"
          name="password"
          value={ user.password }
          onChange={ handleChange }
          placeholder="Type your password"
        />
        <Button
          dataTestId="common_login__button-login"
          type="submit"
          name="login"
          text="Login"
          disabled={ isDisabled }
        />
        <Button
          dataTestId="common_login__button-register"
          type="button"
          name="login"
          text="Ainda não tenho conta"
          onClick={ handleRedirectRegister }
        />
      </form>
      <p
        data-testid="common_login__element-invalid-email"
        hidden={ !errorResponse }
      >
        {errorResponse}
      </p>
    </div>
  );
}

export default Login;
