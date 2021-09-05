import ProductItem from '../ProductItem/ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'First book',
    price: 6,
    description: 'This is a first product - amazing!',
  },
  {
    id: 'p2',
    title: 'Second book',
    price: 5,
    description: 'This is a second product - amazing!',
  },
  {
    id: 'p3',
    title: 'Third book',
    price: 7,
    description: 'This is a third product - amazing!',
  },
];

const Products = (props) => {
  const renderProdutItems = DUMMY_PRODUCTS.map((item) => {
    return (
      <ProductItem
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        description={item.description}
      />
    );
  });

  // const renderProdutItems = (
  //   <ProductItem
  //     title="Test"
  //     price={6}
  //     description="This is a first product - amazing!"
  //   />
  // );

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{renderProdutItems}</ul>
    </section>
  );
};

export default Products;
