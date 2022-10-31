import React, { useContext } from 'react';
import NavButton from './NavButton';
import { UserContext } from '../context/UserContext';

function HeaderProducts() {
  const { loggedUser } = useContext(UserContext);

  return (
    <header>
      <nav>
        <NavButton
          dataTestId="customer_products__element-navbar-link-products"
          type="button"
          name="products"
          text="Produtos"
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
        />
      </nav>
    </header>
  );
}

export default HeaderProducts;
