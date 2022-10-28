import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import App from '../../App';
import renderWithRouterContext from '../helpers/renderWithRouterContext';
import { customer } from '../helpers/mocks/users';

jest.mock('axios');

const VALID_EMAIL = 'user@email.com';
const INVALID_EMAIL = 'useremailcom';
const VALID_PASSWORD = '123456';
const INVALID_PASSWORD = '12345';

describe('Login Page', () => {
  describe('Render', () => {
    it('checks if Login page elements are rendered as expected', () => {
      renderWithRouterContext(<App />, {}, { route: '/login' });

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    afterEach(() => jest.clearAllMocks());

    it('Enables login button if valid info', () => {
      renderWithRouterContext(<App />, {}, { route: '/login' });

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
      renderWithRouterContext(<App />, {}, { route: '/login' });

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(emailInput, INVALID_EMAIL);
      userEvent.type(passwordInput, INVALID_PASSWORD);

      expect(submitBtn).toBeDisabled();
    });

    it('Redirects to customer products page with customer valid info', async () => {
      axios.post.mockResolvedValue({ data: { ...customer } });
      const { history } = renderWithRouterContext(<App />, {}, { route: '/login' });

      const emailInput = screen.getByLabelText(/Login/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Login/i });

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitBtn);

      await waitForElementToBeRemoved(submitBtn);

      expect(history.location.pathname).toBe('/customer/products');
    });

    it('Render error message if user is not found', async () => {
      axios.post.mockRejectedValue({ message: 'Not found' });
      renderWithRouterContext(<App />, {}, { route: '/login' });

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
});
