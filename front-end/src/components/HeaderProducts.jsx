import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavButton from './NavButton';
import { UserContext } from '../context/UserContext';
import { logoutStg } from '../services/userLocalStg';

function HeaderProducts() {
  const history = useHistory();
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const handleRedirectProducts = () => {
    history.push('/customer/products');
  };

  const handleLogout = () => {
    setLoggedUser({
      name: '',
      email: '',
      token: '',
      role: '' });
    logoutStg();
    history.push('/login');
  };

  return (
    <header>
      <nav>
        <NavButton
          dataTestId="customer_products__element-navbar-link-products"
          type="button"
          name="products"
          text="Produtos"
          onClick={ handleRedirectProducts }
        />
        <NavButton
          dataTestId="customer_products__element-navbar-link-orders"
          type="button"
          name="orders"
          text="Meus Pedidos"
        />
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { loggedUser.name }
        </span>
        <NavButton
          dataTestId="customer_products__element-navbar-link-logout"
          type="button"
          name="logout"
          text="Sair"
          onClick={ handleLogout }
        />
      </nav>
    </header>
  );
}

export default HeaderProducts;
