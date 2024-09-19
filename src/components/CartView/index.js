import { useContext } from 'react';
import CartItem from '../CartItem';
import Cart from '../../Context/CartContext';
import './index.css';

const CartView = () => {
  const { cartList } = useContext(Cart); 

  return (
    <div className="cart-view-container">
      {cartList.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
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

