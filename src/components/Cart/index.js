import Header from '../Header'
import CartView from '../CartView'
import './index.css'

const Cart = () => {
     

     return (
        <>
        <Header />
        <div className="cart-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
            alt="cart"
            className="cart-img"
          />
          <CartView/>
        </div>
      </>
     )
}
export default Cart