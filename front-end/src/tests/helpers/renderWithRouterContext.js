import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import { OrdersContext } from '../../context/OrdersContext';

const renderWithRouterContext = (
  component,
  userContextValue = {},
  orderContextValue = {},
) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <UserContext.Provider value={ userContextValue }>
          <OrdersContext.Provider value={ orderContextValue }>
            {component}
          </OrdersContext.Provider>
        </UserContext.Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterContext;
