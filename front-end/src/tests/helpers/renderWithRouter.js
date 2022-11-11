import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../context/UserContext';
import { OrdersProvider } from '../../context/OrdersContext';

const renderWithRouter = (ui, { route = '/' } = {}, contextUser = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent,
    ...render(
      <UserContext.Provider value={ contextUser }>
        <OrdersProvider>
          {ui}
        </OrdersProvider>
      </UserContext.Provider>,
      { wrapper: BrowserRouter },
    ),
  };
};

export default renderWithRouter;
