import { useContext } from 'react';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import {Cart} from '../../Context/CartContext'



import './index.css';

const CartItem = (props) => {
  const { cartItemDetails } = props;
  const {  id,title, brand, quantity, price, imageUrl } = cartItemDetails;
  const { removeItem,incrementCartItemQuantity,decrementCartItemQuantity } = useContext(Cart);

  const onclickDelete = () => {
    removeItem(id)
  }
 
  const onClickAdd= () => {
    incrementCartItemQuantity(id)
  }

  const onClickMinus = () => {
    decrementCartItemQuantity(id)
  }

  

 

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>
        <div className="cart-quantity-container">
          <button type="button" className="quantity-controller-button" onClick={onClickMinus}>
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button type="button" className="quantity-controller-button" onClick={onClickAdd} >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-delete-container">
          <p className="cart-total-price">Rs {price}/-</p>
          <button className="remove-button" type="button" onClick={onclickDelete} >
            Remove
          </button>
        </div>
      </div>
      <button className="delete-button" type="button" onClick={ onclickDelete}  >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;

