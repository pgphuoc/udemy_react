import cartContext from './../../store/cart-context';
import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnHighligted, setBtnHighligted] = useState(false);
  const cartCtx = useContext(cartContext);

  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnHighligted(true);

    const timer = setTimeout(() => {
      setBtnHighligted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClass = `${classes.button} ${btnHighligted ? classes.bump : ''}`;

  const cartItemNum = cartCtx.items.reduce((curNum, item) => {
    return (curNum += item.amount);
  }, 0);

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemNum}</span>
    </button>
  );
};

export default HeaderCartButton;
