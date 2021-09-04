import Modal from '@/components/UI/Modal/Modal';
import cartContext from '@/store/cart-context';
import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';
import { API_ENDPOINT_URL } from '@/constants';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(cartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const cartItemRemodeHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemodeHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const cartAction = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHidenCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const onOrderSubmitHandler = async (user) => {
    await fetch(API_ENDPOINT_URL + 'orders.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        orderItems: cartCtx.items,
      }),
    });
  };

  return (
    <Modal onClose={props.onHidenCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onHidenCart}
          onConfirm={onOrderSubmitHandler}
        />
      )}
      {!isCheckout && cartAction}
    </Modal>
  );
};

export default Cart;
