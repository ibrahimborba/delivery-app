import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import * as api from '../../services/api';
import App from '../../App';
import Register from '../../pages/Register';
import renderWithRouterContext from '../helpers/renderWithRouterContext';
import { customer } from '../mocks/users';
import products from '../mocks/products';

jest.mock('axios');

const VALID_NAME = 'Nome Sobrenome';
const INVALID_NAME = 'Nome';
const VALID_EMAIL = 'user@email.com';
const INVALID_EMAIL = 'useremailcom';
const VALID_PASSWORD = '123456';
const INVALID_PASSWORD = '12345';

describe('Login Page', () => {
  describe('Render', () => {
    it('checks if Login page elements are rendered as expected', () => {
      renderWithRouterContext(<Register />);

      const nameInput = screen.getByLabelText(/Nome/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    afterEach(() => jest.clearAllMocks());

    it('Enables register button if valid info', () => {
      renderWithRouterContext(<Register />);

      const nameInput = screen.getByLabelText(/Nome/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(nameInput, VALID_NAME);
      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);

      expect(submitBtn).not.toBeDisabled();
    });

    it('Disables register button if invalid info', () => {
      renderWithRouterContext(<Register />);

      const nameInput = screen.getByLabelText(/Nome/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(nameInput, INVALID_NAME);
      userEvent.type(emailInput, INVALID_EMAIL);
      userEvent.type(passwordInput, INVALID_PASSWORD);

      expect(submitBtn).toBeDisabled();
    });

    it('Render error message if user already exists', async () => {
      axios.post.mockRejectedValue({ message: 'Conflict' });
      renderWithRouterContext(<Register />);

      const nameInput = screen.getByLabelText(/Nome/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      userEvent.type(nameInput, VALID_NAME);
      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitBtn);

      const errorMessage = await screen.findByText(/Conflict/i);
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
      history.push('/register');

      const nameInput = screen.getByLabelText(/Nome/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      userEvent.type(nameInput, VALID_NAME);
      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitBtn);
      
      await waitForElementToBeRemoved(submitBtn);
      expect(history.location.pathname).toBe('/customer/products');

      const exitBtn = screen.getByRole('button', { name: /Sair/i });
      userEvent.click(exitBtn);
    });
  });
});
