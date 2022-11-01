import React, {
  createContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

export const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({
    name: '',
    email: '',
    token: '',
    role: '',
  });

  const contextValue = useMemo(() => ({
    loggedUser,
    setLoggedUser,
  }), [loggedUser]);

  return (
    <CheckoutContext.Provider value={ contextValue }>
      {children}
    </CheckoutContext.Provider>
  );
}

CheckoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
