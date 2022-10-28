import React, {
  createContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export function UserProvider({ children }) {
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
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
