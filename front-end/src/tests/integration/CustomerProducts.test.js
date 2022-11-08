import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import * as api from '../../services/api';
import App from '../../App';
import CustomerProducts from '../../pages/CustomerProducts';
import renderWithRouterContext from '../helpers/renderWithRouterContext';
import renderWithRouter from '../helpers/renderWithRouter';
import { UserContext } from '../../context/UserContext';
import { OrdersContext } from '../../context/OrdersContext';
import { customer, seller } from '../mocks/users';
import products from '../mocks/products';
import orders from '../mocks/orders';

jest.mock('axios');

describe('CustomerProducts Page', () => {
  describe('Render', () => {

    afterEach(() => jest.clearAllMocks());

    it('checks if CustomerProducts page elements are rendered as expected', async () => {
      axios.get.mockResolvedValue({ data: products });
      const contextUser = { loggedUser: customer };
      renderWithRouter(<CustomerProducts />, { route: '/customer/products' }, contextUser);
      
      const userName = screen.getByText(/Zé Birita/i);
      const totalOrders = screen.getByText(/Total/i);
      const productsBtn = screen.getByRole('button', { name: /Produtos/i });
      const ordersBtn = screen.getByRole('button', { name: /Meus Pedidos/i });
      const exitBtn = screen.getByRole('button', { name: /Sair/i });
      const goToCart = screen.getByRole('button', { name: /Ver Carrinho/i });

      const productPrice = await screen.findByText(/2,20/i);
      const productName = screen.getByText(/Skol Lata 250ml/i);
      const productImage = screen.getByRole('img', { name: /Skol Lata 250ml/i });
      const addBtn = screen.getAllByRole('button', { name: '+' });
      const removeBtn = screen.getAllByRole('button', { name: '-' });
      const quantityInput = screen.getAllByDisplayValue(0);

      expect(userName).toBeInTheDocument();
      expect(totalOrders).toBeInTheDocument();
      expect(productsBtn).toBeInTheDocument();
      expect(ordersBtn).toBeInTheDocument();
      expect(exitBtn).toBeInTheDocument();
      expect(goToCart).toBeInTheDocument();
      expect(goToCart).toBeDisabled();

      expect(productPrice).toBeInTheDocument();
      expect(productName).toBeInTheDocument();
      expect(productImage).toBeInTheDocument();
      expect(addBtn).toHaveLength(3);
      expect(removeBtn).toHaveLength(3);
      expect(quantityInput).toHaveLength(3);
    });
  });

 
  describe('Behavior', () => {
  
    afterEach(() => jest.clearAllMocks());

    it('Adds items to cart, changes total price and enables go to cart button', async () => {
      axios.get.mockResolvedValue({ data: products });
      const contextUser = { loggedUser: customer };
      renderWithRouter(<App />, { route: '/customer/products' }, contextUser);

      const addBtn = await screen.findAllByRole('button', { name: '+' });
    
      userEvent.click(addBtn[0]);
      userEvent.click(addBtn[0]);

      const newQuantity = screen.getByDisplayValue(2);
      const totalOrders = screen.getByText(/Total/i);
      const goToCart = screen.getByRole('button', { name: /Ver Carrinho/i });

      expect(newQuantity).toBeInTheDocument();
      expect(totalOrders).toHaveTextContent(/4,40/i);
      expect(goToCart).toHaveTextContent(/4,40/i);
      expect(goToCart).not.toBeDisabled();
    });

    it('Removes items from cart, changes total price and disables go to cart button', async () => {
      axios.get.mockResolvedValue({ data: products });
      const contextUser = { loggedUser: customer };
      renderWithRouter(<CustomerProducts />, { route: '/customer/products' }, contextUser);

      const addBtn = await screen.findAllByRole('button', { name: '+' });
      const removeBtn = screen.getAllByRole('button', { name: '-' });
    
      userEvent.click(addBtn[0]);

      const newAddQuantity = screen.getByDisplayValue(1);
      const totalOrders = screen.getByText(/Total/i);
      const goToCart = screen.getByRole('button', { name: /Ver Carrinho/i });

      expect(newAddQuantity).toBeInTheDocument();
      expect(totalOrders).toHaveTextContent(/2,20/i);
      expect(goToCart).toHaveTextContent(/2,20/i);
      expect(goToCart).not.toBeDisabled();
      
      userEvent.click(removeBtn[0]);
      userEvent.click(removeBtn[0]);

      const newRemoveQuantity = screen.queryByDisplayValue(1);
      expect(newRemoveQuantity).not.toBeInTheDocument();
      expect(totalOrders).toHaveTextContent(/0,00/i);
      expect(goToCart).toHaveTextContent(/0,00/i);
      expect(goToCart).toBeDisabled();
    });
  });

  describe('Redirects', () => {
  
    afterEach(() => jest.clearAllMocks());

    it('Redirects to customer products page', async () => {
      axios.get.mockResolvedValue({ data: products });
      const contextUser = { loggedUser: customer };
      const { user } = renderWithRouter(<App />, { route: '/customer/products' }, contextUser);

      const productsBtn = screen.getByRole('button', { name: /Produtos/i });
      user.click(productsBtn);

      const productName = await screen.findByText(/Skol Lata 250ml/i);
      expect(productName).toBeInTheDocument();
    });

    it('Redirects to customer orders page', async () => {
      axios.get.mockResolvedValue({ data: products });
      api.getSalesByUserEmail = jest.fn().mockImplementation(() => orders);

      const contextUser = { loggedUser: customer };
      const { user } = renderWithRouter(<App />, { route: '/customer/products' }, contextUser);

      const ordersBtn = screen.getByRole('button', { name: /Meus Pedidos/i });
      user.click(ordersBtn);

      const orderId = await screen.findByText(/Pedido 1/i);
      expect(orderId).toBeInTheDocument();
    });

    it('Redirects to checkout page', async () => {
      axios.get.mockResolvedValue({ data: products });
      act(() => {
        api.sellers = jest.fn().mockImplementation(() => [seller])
      });

      const contextUser = { loggedUser: customer };
      const {user} = renderWithRouter(<App />, { route: '/customer/products' }, contextUser);

      const addBtn = await screen.findAllByRole('button', { name: '+' });
      const goToCart = screen.getByRole('button', { name: /Ver Carrinho/i });
    
      user.click(addBtn[0]);
      user.click(addBtn[0]);
      user.click(goToCart);

      const checkoutBtn = screen.getByRole('button', { name: /Finalizar Pedido/i });
      expect(checkoutBtn).toBeInTheDocument();
    });
  });

});
