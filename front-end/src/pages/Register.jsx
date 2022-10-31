import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { register } from '../services/api';
import { UserContext } from '../context/UserContext';

function Register() {
  const history = useHistory();
  const [user, setUser] = useState({ email: '', password: '', name: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorResponse, setErrorResponse] = useState('');
  const { setLoggedUser } = useContext(UserContext);

  useEffect(() => {
    const MIN_PASS_LENGTH = 6;
    const MIN_NAME_LENGTH = 12;
    const emailTest = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    setIsDisabled(
      !(emailTest.test(user.email)
      && user.password.length >= MIN_PASS_LENGTH
      && user.name.length >= MIN_NAME_LENGTH),
    );
  }, [user.email, user.password, user.name]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await register(user);
    const { name, email, token, role, message } = response;
    if (message) return setErrorResponse(message);

    setLoggedUser({ name, email, token, role });
    history.push('/customer/products');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={ handleSubmit }>
        <Input
          label="Nome"
          dataTestId="common_register__input-name"
          type="name"
          name="name"
          value={ user.name }
          onChange={ handleChange }
          placeholder="Type your name"
        />
        <Input
          label="Email"
          dataTestId="common_register__input-email"
          type="email"
          name="email"
          value={ user.email }
          onChange={ handleChange }
          placeholder="Type your e-mail"
        />
        <Input
          label="Senha"
          dataTestId="common_register__input-password"
          type="password"
          name="password"
          value={ user.password }
          onChange={ handleChange }
          placeholder="Type your password"
        />
        <Button
          dataTestId="common_register__button-register"
          type="submit"
          name="login"
          text="Cadastrar"
          disabled={ isDisabled }
        />
      </form>
      <p
        data-testid="common_register__element-invalid_register"
        hidden={ !errorResponse }
      >
        { errorResponse }
      </p>
    </div>
  );
}

export default Register;
