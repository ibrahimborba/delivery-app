import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import * as api from '../../services/api';
import App from '../../App';
import Login from '../../pages/Login';
import renderWithRouterContext from '../helpers/renderWithRouterContext';
import { customer, seller, administrator } from '../mocks/users';
import products from '../mocks/products';
import orders from '../mocks/orders';

jest.mock('axios');

const VALID_EMAIL = 'user@email.com';
const INVALID_EMAIL = 'useremailcom';
const VALID_PASSWORD = '123456';
const INVALID_PASSWORD = '12345';

describe('Login Page', () => {
  describe('Render', () => {
    it('checks if Login page elements are rendered as expected', () => {
      renderWithRouterContext(<Login />);

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });
      const registerBtn = screen.getByRole('button', { name: /não tenho conta/i });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
      expect(registerBtn).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    afterEach(() => jest.clearAllMocks());

    it('Enables login button if valid info', () => {
      renderWithRouterContext(<Login />);

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);

      expect(submitBtn).not.toBeDisabled();
    });

    it('Disables login button if invalid info', () => {
      renderWithRouterContext(<Login />);

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(emailInput, INVALID_EMAIL);
      userEvent.type(passwordInput, INVALID_PASSWORD);

      expect(submitBtn).toBeDisabled();
    });

    it('Render error message if user is not found', async () => {
      axios.post.mockRejectedValue({ message: 'Not found' });
      renderWithRouterContext(<Login />);

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitBtn);

      const errorMessage = await screen.findByText(/not found/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Redirects', () => {
    afterEach(() => jest.clearAllMocks());

    it('Redirects to customer products page with valid customer info', async () => {
      axios.post.mockResolvedValue({ data: { ...customer } });
      act(() => {
        api.getProducts = jest.fn().mockImplementation(() => products)
      });
      const { history } = renderWithRouterContext(<App />);

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitBtn);
      
      await waitForElementToBeRemoved(submitBtn);
      expect(history.location.pathname).toBe('/customer/products');

      const exitBtn = screen.getByRole('button', { name: /Sair/i });
      userEvent.click(exitBtn);
    });


    it('Redirects to seller orders page with valid seller info', async () => {
      axios.post.mockResolvedValue({ data: { ...seller } });
      act(() => {
        api.getProductsSeller = jest.fn().mockImplementation(() => orders)
      });
      const { history } = renderWithRouterContext(<App />);

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitBtn);
      
      await waitForElementToBeRemoved(submitBtn);
      expect(history.location.pathname).toBe('/seller/orders');

      const exitBtn = screen.getByRole('button', { name: /Sair/i });
      userEvent.click(exitBtn);
    });

    it('Redirects to admin page with valid admin info', async () => {
      axios.post.mockResolvedValue({ data: { ...administrator } });
      const { history } = renderWithRouterContext(<App />);

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitBtn);
      
      await waitForElementToBeRemoved(submitBtn);
      expect(history.location.pathname).toBe('/admin/manage');
    });

    it('Redirects to register page on register button click', async () => {
      axios.post.mockResolvedValue({ data: { ...customer } });
      const { history } = renderWithRouterContext(<App />);

      const registerBtn = screen.getByRole('button', { name: /não tenho conta/i });
      expect(registerBtn).toBeInTheDocument();

      userEvent.click(registerBtn);
      expect(history.location.pathname).toBe('/register');
    });
  });
});
