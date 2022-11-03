import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const contextValue = useMemo(() => ({
    orders,
    setOrders,
  }), [orders]);

  return (
    <OrdersContext.Provider value={ contextValue }>
      {children}
    </OrdersContext.Provider>
  );
}

OrdersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
