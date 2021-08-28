import { useReducer } from 'react';
import CartContext from './cart-context';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
    amount: 0,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
    amount: 0,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
    amount: 0,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
    amount: 0,
  },
];

const defaultCartState = {
  items: DUMMY_MEALS,
  totalAmount: 0,
};

const CART_ADD_ACTION = 'CART_ADD_ACTION';
const CART_REMOVE_ACTION = 'CART_REMOVE_ACTION';

const cartReducer = (state, action) => {
  let updatedTotalAmount;

  switch (action.type) {
    case CART_ADD_ACTION:
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const indexCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[indexCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[indexCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case CART_REMOVE_ACTION:
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      updatedTotalAmount = state.totalAmount - existingItem.price;
      let newItems;
      if (existingItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        newItems = [...state.items];
        newItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    default:
      return defaultCartState;
  }
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addCartItemHandler = (item) => {
    dispatchCartAction({ type: CART_ADD_ACTION, item });
  };

  const removeCartItemHandler = (id) => {
    dispatchCartAction({ type: CART_REMOVE_ACTION, id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
