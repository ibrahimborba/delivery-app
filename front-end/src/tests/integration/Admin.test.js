import React from 'react'
import * as axios from 'axios';
import * as api from '../../services/api';
import { act, screen } from '@testing-library/react'
import renderWithRouterContext from '../helpers/renderWithRouterContext'
import { administrator } from '../mocks/users'
import userEvent from '@testing-library/user-event'
import Admin from '../../pages/Admin';
import { users } from '../mocks/apiResult';

jest.mock('axios');

describe('Admin page', () => {
  describe('Render', () => {
    afterEach(() => jest.clearAllMocks());

    it('Check if Customer checkout page elements are rendering as expected', async () => {
      axios.get.mockResolvedValue({ data: users });
      act(() => {
        renderWithRouterContext(<Admin />, { loggedUser: administrator });
      })

      const nameInput = screen.getByLabelText(/Nome/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const roleInput = screen.getByLabelText(/Tipo/i);
      const registerUserBtn = screen.getByRole('button', { name: /Cadastrar/i });

      const userItem = await screen.findAllByTestId(/admin_manage__element-user-table-item-number/i);
      const userName = screen.getAllByTestId(/admin_manage__element-user-table-name/i);
      const userEmail = screen.getAllByTestId(/admin_manage__element-user-table-email/i);
      const userRole = screen.getAllByTestId(/admin_manage__element-user-table-role/i);
      const userRemoveBtn = screen.getAllByTestId(/admin_manage__element-user-table-remove/i);

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(roleInput).toBeInTheDocument();
      expect(registerUserBtn).toBeInTheDocument();

      expect(userItem[0]).toBeInTheDocument();
      expect(userName[0]).toBeInTheDocument();
      expect(userEmail[0]).toBeInTheDocument();
      expect(userRole[0]).toBeInTheDocument();
      expect(userRemoveBtn[0]).toBeInTheDocument();
    })
  })
})