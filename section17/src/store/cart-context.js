import React from 'react';

const CART_INITIAL_VALUE = {
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
};

const CartContext = React.createContext(CART_INITIAL_VALUE);

export default CartContext;
