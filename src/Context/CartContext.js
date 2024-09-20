import { useState, createContext } from "react";

export const Cart = createContext();

export const Tarun = ({ children }) => {
    const [cartList, setCartList] = useState([]);

    return (
        <Cart.Provider value={{ cartList, setCartList }}>
            {children}
        </Cart.Provider>
    );
};


export default Tarun
