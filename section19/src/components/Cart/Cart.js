import Card from '../UI/Card/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';

import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  const renderCartItem = cartItems.map((item) => {
    return (
      <CartItem
        key={item.id}
        item={{
          id: item.id,
          title: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.totalPrice,
        }}
      />
    );
  });
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{renderCartItem}</ul>
    </Card>
  );
};

export default Cart;
