import { useState, createContext } from "react";

export const Cart = createContext();



export const Tarun = ({ children }) => {
    const [cartList, setCartList] = useState([]);

     const removeItem = itemId => {
        const update =cartList.filter(item => item.id !== itemId)
        setCartList(update)
     }
     const incrementCartItemQuantity = (id) => {
        const updatedCart = cartList.map((eachItem) => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity + 1;
            return { ...eachItem, quantity: updatedQuantity };
          }
          return eachItem;
        });
        setCartList(updatedCart); 
      };

      const decrementCartItemQuantity = (id) => {

        const updatedCart = cartList.map((eachItem) => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1;
            return { ...eachItem, quantity: updatedQuantity };
          }
          return eachItem;
        });
        setCartList(updatedCart); 
      };

      

      



      
    return (
        <Cart.Provider value={{ cartList, setCartList,removeItem,incrementCartItemQuantity,decrementCartItemQuantity }}>
            {children}
        </Cart.Provider>
    );
};


export default Tarun
