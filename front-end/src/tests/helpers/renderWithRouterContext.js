import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { UserProvider } from '../../context/UserContext';

const renderWithRouterContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <UserProvider>
        <Router history={ history }>{component}</Router>
      </UserProvider>,
    ),
    history,
  });
};
export default renderWithRouterContext;
