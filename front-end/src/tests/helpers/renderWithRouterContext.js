import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import { OrdersProvider } from '../../context/OrdersContext';

const renderWithRouterContext = (component, { contextValue = {} } = {}) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <UserContext.Provider value={ contextValue }>
          <OrdersProvider>
            {component}
          </OrdersProvider>
        </UserContext.Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterContext;
