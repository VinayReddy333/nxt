import { createContext, useState } from 'react';

const Cart = createContext();

export const Store = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  return (
    <Cart.Provider value={{ cartList, setCartList }}>
      {children}
    </Cart.Provider>
  );
};

export default Cart;
