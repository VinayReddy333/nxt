import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Store from './Context/CartContext'
import Home from './components/Home';
import Login from './components/Login';
import Cart from './components/Cart';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import NotFound from './components/NotFound';
import './App.css'

const App = () => (
  
    <BrowserRouter>
    <Store>
      <Routes>
       <Route path='/login' element={<Login />} /> 
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductItemDetails/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      </Store>
    </BrowserRouter>
  
)

export default App;
