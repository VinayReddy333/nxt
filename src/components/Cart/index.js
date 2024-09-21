import Header from '../Header'
import CartView from '../CartView'
import './index.css'

const Cart = () => {
     

     return (
        <>
        <Header />
        <div className="cart-container">
          
          <CartView/>
        </div>
      </>
     )
}
export default Cart