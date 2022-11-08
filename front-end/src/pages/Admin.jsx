import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { adminRegister, getUsersAndSellers } from '../services/api';

function Admin() {
  const roles = ['customer', 'seller', 'administrator'];

  const [userInfo, setUserInfo] = useState(
    { name: '', email: '', password: '', role: roles[0] },
  );
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);
  const [errorResponse, setErrorResponse] = useState('');
  const [usersAndSellers, setUsersAndSellers] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setErrorResponse('');

    setUserInfo((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { message } = await adminRegister(userInfo);
    setUserInfo({ name: '', email: '', password: '', role: roles[0] });

    if (message) return setErrorResponse(message);
  };

  useEffect(() => {
    const MIN_PASS_LENGTH = 6;
    const MIN_NAME_LENGTH = 12;
    const emailTest = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    setIsRegisterDisabled(
      !(emailTest.test(userInfo.email)
        && userInfo.password.length >= MIN_PASS_LENGTH
        && userInfo.name.length >= MIN_NAME_LENGTH),
    );
  }, [userInfo]);

  const fetchUsersAndSellers = async () => {
    const data = await getUsersAndSellers();
    setUsersAndSellers(data);
  };

  useEffect(() => {
    fetchUsersAndSellers();
  }, []);

  return (
    <>
      <section>
        <p
          data-testid="admin_manage__element-invalid-register"
          hidden={ !errorResponse }
        >
          {errorResponse}
        </p>
        <h2>Lista de usuários</h2>
        <form onSubmit={ handleSubmit }>
          <Input
            label="Nome"
            dataTestId="admin_manage__input-name"
            type="text"
            name="name"
            value={ userInfo.name }
            onChange={ handleChange }
            placeholder="Nome e Sobrenome"
          />
          <Input
            label="Email"
            dataTestId="admin_manage__input-email"
            type="email"
            name="email"
            value={ userInfo.email }
            onChange={ handleChange }
            placeholder="seu email@site.com.br"
          />
          <Input
            label="Senha"
            dataTestId="admin_manage__input-password"
            type="password"
            name="password"
            value={ userInfo.password }
            onChange={ handleChange }
            placeholder="*********"
          />
          <select
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
            value={ userInfo.role }
          >
            {roles.map((roleType, index) => (
              <option value={ roleType } key={ index }>
                {roleType}
              </option>
            ))}
          </select>
          <Button
            dataTestId="admin_manage__button-register"
            type="submit"
            name="cadastro"
            text="CADASTRAR"
            disabled={ isRegisterDisabled }
          />
        </form>
      </section>
      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {usersAndSellers.length > 0 && (
            usersAndSellers.map((user, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  {user.name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  {user.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {user.role === 'seller' ? 'P. Vendedora' : 'Cliente'}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                >
                  Excluir
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default Admin;
