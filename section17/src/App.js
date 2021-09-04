import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layouts/Header/Header';
import Meals from './components/Meals/Meals';
import CartContextProvider from './store/CartContextProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onHidenCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
