import React from 'react';
import { act, screen } from '@testing-library/react';
import * as axios from 'axios';
import * as api from '../../services/api';
import SellerOrderDetails from '../../pages/SellerOrderDetails';
import renderWithRouter from '../helpers/renderWithRouter';
import { seller } from '../mocks/users';
import orderDetails from '../mocks/customerOrderDetails';
import orderDetailsDelivered from '../mocks/orderDetailsDelivered';

jest.mock('axios');

describe('SellerOrderDetails Page', () => {
  describe('Render', () => {

    afterEach(() => jest.clearAllMocks());

    it('checks if SellerOrderDetails page elements are rendered as expected', async () => {
      axios.get.mockResolvedValue({ data: orderDetails });
      axios.patch.mockResolvedValue({ data: orderDetails });
      const contextUser = { loggedUser: seller };
      renderWithRouter(<SellerOrderDetails />, { route: '/customer/products' }, contextUser);
      
      const orderStatus = await screen.findByText(/Em Trânsito/i);
      const orderDate = screen.getByText('07/11/2022');
      const totals = screen.getAllByText(/4,40/i);
      const preparingBtn = screen.getByRole('button', { name: /Preparar/i });
      const deliveringBtn = screen.getByRole('button', { name: /Saiu para Entrega/i });

      const productName = screen.getByText(/Skol Lata 250ml/i);
      const productQuantity = screen.getByText('2');
      const productPrice = screen.getByText(/2,20/i);

      expect(orderStatus).toBeInTheDocument();
      expect(orderDate).toBeInTheDocument();
      expect(totals).toHaveLength(2);
      expect(preparingBtn).toBeInTheDocument();
      expect(deliveringBtn).toBeInTheDocument();

      expect(productName).toBeInTheDocument();
      expect(productQuantity).toBeInTheDocument();
      expect(productPrice).toBeInTheDocument();
    });
  });
});
