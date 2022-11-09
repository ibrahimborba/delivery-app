import React from 'react'
import * as axios from 'axios';
// import { sellers } from '../../services/api';
import * as api from '../../services/api';
import { act, screen, waitFor } from '@testing-library/react'
import CustomerCheckout from '../../pages/CustomerCheckout'
import renderWithRouterContext from '../helpers/renderWithRouterContext'
import orders from '../mocks/checkoutProducts'
import { customer } from '../mocks/users'
import userEvent from '@testing-library/user-event'
import apiResult from '../mocks/apiResult';

jest.mock('axios');

const DELIVERY_ADDRESS = 'Rua de teste';
const DELIVERY_NUMBER = 100;

describe('Customer Checkout page', () => {
  describe('render', () => {
    afterEach(() => jest.clearAllMocks());

    it('Check if Customer checkout page elements are rendering as expected', () => {
      axios.get.mockResolvedValue({ data: apiResult });

      renderWithRouterContext(<CustomerCheckout />, { loggedUser: customer}, {orders});

      const sellerInput = screen.getByLabelText(/Vendedora/i);
      const deliveryAddressInput = screen.getByLabelText(/endereço/i);
      const deliveryNumberInput = screen.getByLabelText(/Número/i);
      const finishOrderBtn = screen.getByRole('button', { name: /finalizar pedido/i });
      const totalPrice = screen.getByTestId('customer_checkout__element-order-total-price');

      const productItem = screen.getAllByTestId(/customer_checkout__element-order-table-item-number/i);
      const productDescription = screen.getAllByTestId(/customer_checkout__element-order-table-name/i);
      const productUnitValue = screen.getAllByTestId(/customer_checkout__element-order-table-quantity/i);
      const productSubtotal = screen.getAllByTestId(/customer_checkout__element-order-table-unit-price/i);
      const productQuantity = screen.getAllByTestId(/customer_checkout__element-order-table-sub-total/i);
      const productRemoveBtn = screen.getAllByTestId(/customer_checkout__element-order-table-remove/i);

      expect(sellerInput).toBeInTheDocument();
      expect(deliveryAddressInput).toBeInTheDocument();
      expect(deliveryNumberInput).toBeInTheDocument();
      expect(finishOrderBtn).toBeInTheDocument();
      expect(totalPrice).toBeInTheDocument();

      expect(productItem[0]).toBeInTheDocument();
      expect(productDescription[0]).toBeInTheDocument();
      expect(productUnitValue[0]).toBeInTheDocument();
      expect(productSubtotal[0]).toBeInTheDocument();
      expect(productQuantity[0]).toBeInTheDocument();
      expect(productRemoveBtn[0]).toBeInTheDocument();
    })
  })

  describe('Behavior', () => {
    afterEach(() => jest.clearAllMocks());

    it('Should disable finish order button if empty address', async () => {
      axios.get.mockResolvedValue({ data: apiResult });
      
      renderWithRouterContext(<CustomerCheckout />, { loggedUser: customer }, { orders });
      
      const deliveryNumberInput = screen.getByLabelText(/Número/i);
      const finishOrderBtn = screen.getByRole('button', { name: /finalizar pedido/i });

      userEvent.type(deliveryNumberInput, DELIVERY_NUMBER);

      expect(finishOrderBtn).toBeInTheDocument();
      expect(finishOrderBtn).toBeDisabled();
    })

    it('Should disable finish order button if empty number', async () => {
      axios.get.mockResolvedValue({ data: apiResult });
      
      renderWithRouterContext(<CustomerCheckout />, { loggedUser: customer }, { orders });
      
      const deliveryAddressInput = screen.getByLabelText(/endereço/i);
      const finishOrderBtn = screen.getByRole('button', { name: /finalizar pedido/i });

      userEvent.type(deliveryAddressInput, DELIVERY_ADDRESS);

      expect(finishOrderBtn).toBeInTheDocument();
      expect(finishOrderBtn).toBeDisabled();
    })

    // it('Should enable finish order button', async () => {
    //   axios.get.mockResolvedValue({ data: apiResult });

    //   renderWithRouterContext(<CustomerCheckout />, { loggedUser: customer }, { orders });
      
    //   const deliveryAddressInput = screen.getByLabelText(/endereço/i);
    //   const deliveryNumberInput = screen.getByLabelText(/Número/i);
    //   const finishOrderBtn = screen.getByRole('button', { name: /finalizar pedido/i });

    //   // userEvent.selectOptions(sellerInput, )
    //   userEvent.type(deliveryAddressInput, DELIVERY_ADDRESS);
    //   userEvent.type(deliveryNumberInput, DELIVERY_NUMBER);

    //   expect(finishOrderBtn).toBeInTheDocument();
    //   expect(finishOrderBtn).not.toBeDisabled();
    // })
  })

  describe('Remove product from cart', () => {
    afterEach(() => jest.clearAllMocks());
    it('Should remove product when remove button selected', () => {
      // axios.get.mockResolvedValue({ data: apiResult });
      
      act(() => {
        api.sellers = jest.fn().mockImplementation(() => apiResult);

        renderWithRouterContext(<CustomerCheckout />, { loggedUser: customer }, { orders });
      })

      const productRemoveBtn = screen.getAllByTestId(/customer_checkout__element-order-table-remove/i);
      const productItem = screen.getAllByTestId(/customer_checkout__element-order-table-item-number/i);

      expect(productItem).toHaveLength(orders.length);

      act(() => {
        userEvent.click(productRemoveBtn[0]);
      })
      
      expect(productItem).toHaveLength(orders.length);
    })
  })
})