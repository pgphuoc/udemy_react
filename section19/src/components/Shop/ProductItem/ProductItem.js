import { cartActions } from '@/store/cart-slice';
import { useDispatch } from 'react-redux';
import Card from '../../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart);

  const onAddCartItemHandler = () => {
    // const updatedItems = cart.items.slice();

    // const existingItem = updatedItems.find((item) => item.id === id);
    // if (existingItem) {
    //   const updatedItem = { ...existingItem };
    //   updatedItem.quantity++;
    //   updatedItem.totalPrice += price;

    //   const existingItemIdx = updatedItems.findIndex((item) => item.id === id);
    //   updatedItems[existingItemIdx] = updatedItem;
    // } else {
    //   updatedItems.push({
    //     id,
    //     name: title,
    //     price,
    //     quantity: 1,
    //     totalPrice: price,
    //   });
    // }

    // dispatch(
    //   cartActions.replaceCart({
    //     items: updatedItems,
    //     totalQuantity: cart.totalQuantity + 1,
    //   })
    // );

    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={onAddCartItemHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
