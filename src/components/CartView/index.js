import { Link } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import {Cart} from '../../Context/CartContext'
import CartItem from '../CartItem';

import './index.css';



const CartView = () => {
 const {cartList,setCartList} = useContext(Cart)

 useEffect(() => {
  const items = localStorage.getItem('cartList') !== null ? JSON.parse(localStorage.getItem('cartList')) : [];
  setCartList(items)
},[setCartList])

  return (
    <div className="cart-view-container">
      {cartList.length === 0 ? (
        <div>
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="cart-empty-image"
      alt="cart empty"/>
        <p className="empty-cart-message">Your cart is empty</p>
        <Link to ='/products'><button className='btn'>Shop</button></Link>
        </div>
      ) : (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
        
      )}
      
    </div>
  );
};

export default CartView;

