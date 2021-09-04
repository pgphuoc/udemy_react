import Modal from '@/components/UI/Modal/Modal';
import cartContext from '@/store/cart-context';
import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';
import useHttp from '@/hooks/use-http';

const Cart = (props) => {
  // Declare properties
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const cartCtx = useContext(cartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // Declare Handler
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const cartItemRemodeHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const onOrderSubmitHandler = async (user) => {
    sendTaskRequest(
      {
        url: 'orders.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          user,
          orderItems: cartCtx.items,
        },
      },
      null
    );
    cartCtx.clearItem();
    setIsSubmitted(true);
  };

  // Generate layout
  const waitingContents = <p>Sending order data..</p>;
  const submitedContents = (
    <React.Fragment>
      <p>{error ? error : 'Successfully sent the order!'}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHidenCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  // Create cart display contents
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

  const cartTotal = (
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
  );

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

  const cartModelContents = (
    <React.Fragment>
      {cartItems}
      {cartTotal}
      {isCheckout && (
        <Checkout
          onCancel={props.onHidenCart}
          onConfirm={onOrderSubmitHandler}
        />
      )}
      {!isCheckout && cartAction}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onHidenCart}>
      {!isLoading && !isSubmitted && cartModelContents}
      {isLoading && !isSubmitted && waitingContents}
      {isSubmitted && submitedContents}
    </Modal>
  );
};

export default Cart;
