import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import * as api from '../../services/api';
import App from '../../App';
import CustomerOrderDetails from '../../pages/CustomerOrderDetails';
import renderWithRouter from '../helpers/renderWithRouter';
import { UserContext } from '../../context/UserContext';
import { OrdersContext } from '../../context/OrdersContext';
import { customer, seller } from '../mocks/users';
import products from '../mocks/products';
import orders from '../mocks/orders';
import orderDetails from '../mocks/orderDetails';
import orderDetailsDelivered from '../mocks/orderDetailsDelivered';

jest.mock('axios');

describe('CustomerOrderDetails Page', () => {
  describe('Render', () => {

    afterEach(() => jest.clearAllMocks());

    it('checks if CustomerOrderDetails page elements are rendered as expected', async () => {
      axios.get.mockResolvedValue({ data: orderDetails });
      axios.patch.mockResolvedValue({ data: orderDetails });
      const contextUser = { loggedUser: customer };
      renderWithRouter(<CustomerOrderDetails />, { route: '/customer/products' }, contextUser);
      
      const sellerName = await screen.findByText(/Fulana Pereira/i);
      const orderStatus = screen.getByText(/Em Trânsito/i);
      const orderDate = screen.getByText('07/11/2022');
      const totals = screen.getAllByText(/4,40/i);
      const deliveredBtn = screen.getByRole('button', { name: /Entregue/i });

      const productName = screen.getByText(/Skol Lata 250ml/i);
      const productQuantity = screen.getByText('2');
      const productPrice = screen.getByText(/2,20/i);

      expect(sellerName).toBeInTheDocument();
      expect(orderStatus).toBeInTheDocument();
      expect(orderDate).toBeInTheDocument();
      expect(totals).toHaveLength(2);
      expect(deliveredBtn).toBeInTheDocument();

      expect(productName).toBeInTheDocument();
      expect(productQuantity).toBeInTheDocument();
      expect(productPrice).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {

    afterEach(() => jest.clearAllMocks());

    it('Enables button with "Em Trânsito" status and change status on click ', async () => {
      axios.get.mockResolvedValue({ data: orderDetails });
      axios.patch.mockResolvedValue({ data: orderDetails });

      const contextUser = { loggedUser: customer };
      const { user } = renderWithRouter(<CustomerOrderDetails />, { route: '/customer/products' }, contextUser);

      const deliveredBtn = screen.getByRole('button', { name: /Entregue/i });
      user.click(deliveredBtn);

      act(() => {
        api.updateStatus = jest.fn().mockImplementation(() => orderDetailsDelivered)
      });

      const newStatus = await screen.findByText('Entregue');
      expect(newStatus).toBeInTheDocument();
    });
  });

});
