import { useReducer } from 'react';
import CartContext from './cart-context';
import _ from 'lodash';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CART_ADD_ACTION = 'CART_ADD_ACTION';
const CART_REMOVE_ACTION = 'CART_REMOVE_ACTION';

const findExistingItem = (items, targetId) => {
  const targetIndex = _.findIndex(items, (item) => {
    return item.id === targetId;
  });

  return items[targetIndex];
};

const cartReducer = (state, action) => {
  let updatedTotalAmount;

  switch (action.type) {
    case CART_ADD_ACTION:
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const targetItem = findExistingItem(state.items, action.item.id);

      if (targetItem) {
        const updatedItems = [...state.items];

        const targetIndex = _.findIndex(updatedItems, (item) => {
          return item.id === targetItem.id;
        });

        updatedItems[targetIndex] = {
          ...targetItem,
          amount: targetItem.amount + action.item.amount,
        };

        return { items: updatedItems, totalAmount: updatedTotalAmount };
      } else {
        const updatedItems = state.items.concat(action.item);
        return { items: updatedItems, totalAmount: updatedTotalAmount };
      }

    case CART_REMOVE_ACTION:
      const removeTargetItem = findExistingItem(state.items, action.id);
      updatedTotalAmount = state.totalAmount - removeTargetItem.price;

      if (removeTargetItem.amount === 1) {
        return {
          items: state.items.filter((item) => item.id !== removeTargetItem.id),
          totalAmount: updatedTotalAmount,
        };
      } else {
        const updatedItems = [...state.items];

        const targetIndex = _.findIndex(updatedItems, (item) => {
          return item.id === removeTargetItem.id;
        });

        updatedItems[targetIndex] = {
          ...removeTargetItem,
          amount: removeTargetItem.amount - 1,
        };

        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }

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
