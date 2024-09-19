import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Header = () => {
      const navigate = useNavigate();

      const onClickLogOut = () => {
          Cookies.remove('jwt_token');
          navigate('/login');
      };

    return (
        <nav className='container'>
            <div className='nav-container'>
                <div className='mobile'>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className='img' />
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png" alt="nav logout" className='nav-img' />
                </div>

                <div className='lg-container'>
                    <Link to ='/'>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className='img' />
                    </Link>
                    
                    <ul className='nav-menu'>
                        <li className="nav-menu-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/products" className="nav-link">Products</Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/cart" className="nav-link">Cart</Link>
                        </li>
                    </ul>
                    <button type='button' className='butt' onClick={onClickLogOut}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
