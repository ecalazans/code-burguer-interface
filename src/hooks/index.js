import PropTypes from 'prop-types';
import React from 'react';

import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

// Não importa a ordem de pai ou filho nos providers
function AppProvider({ children }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
}

// Tipo de dado que será passado como parâmetro no children
AppProvider.propTypes = {
  children: PropTypes.node
};

export default AppProvider;
