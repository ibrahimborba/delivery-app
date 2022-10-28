import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import renderWithRouterContext from '../helpers/renderWithRouterContext';

const VALID_EMAIL = 'test@test.test';
const INVALID_EMAIL = 'testtest.test';
const VALID_PASSWORD = '123456';
const INVALID_PASSWORD = '12345';

describe('Login Page', () => {
  describe('Render', () => {
    it('checks if Login page elements are rendered as expected', () => {
      renderWithRouterContext(<Login />, {route: '/login'});
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

    it('Enables login button wiht valid info', () => {
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

    it('Not enable login button wiht invalid info', () => {
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
  });
});
