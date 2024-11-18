import { useState, useEffect, useCallback,useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Cart} from '../../Context/CartContext';



import Header from '../Header';
import { IoAddOutline } from "react-icons/io5";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import SimilarProductItem from '../SimilarProductItem';

import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};


const items = localStorage.getItem('cartList') !== null ? JSON.parse(localStorage.getItem('cartList')) : [];


const ProductItemDetails = () => {
  const [productData, setProductData] = useState(items);
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);
  const {setCartList} = useContext(Cart)
  

 

  const { id } = useParams();

  // const getFormattedData = useCallback(data => ({
  //   availability: data.availability,
  //   brand: data.brand,
  //   description: data.description,
  //   id: data.id,
  //   imageUrl: data.image_url,
  //   price: data.price,
  //   rating: data.rating,
  //   title: data.title,
  //   totalReviews: data.total_reviews,
  // }), []);

  const getProductData = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `https://apis.ccbp.in/products/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);
      const fetchedData = await response.json();
      if (response.ok) {
        
        const updatedData = ({
          availability: fetchedData.availability,
          brand: fetchedData.brand,
          description: fetchedData.description,
          id: fetchedData.id,
          imageUrl: fetchedData.image_url,
          price: fetchedData.price,
         rating:fetchedData.rating,
         title: fetchedData.title,
          totalReviews: fetchedData.total_reviews,
        })
        
        const updatedSimilarProductsData = fetchedData.similar_products.map(
          product => ({
            id: product.id,
            title: product.title,
            brand: product.brand,
            imageUrl: product.image_url,
            price: product.price,
            rating: product.rating,
          })
        );
        setProductData(updatedData);
        setSimilarProductsData(updatedSimilarProductsData);
        setApiStatus(apiStatusConstants.success);
      } else if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  }, [ id])

  useEffect(() => {
    getProductData();
  }, [getProductData]);

 

  const renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    
      setQuantity(prevQuantity => prevQuantity + 1);

    
    
  };

  const onClickAdd = () => {
    setCartList(prevCartList => {
      const updatedCartList = [...prevCartList, productData];
      localStorage.setItem('cartList', JSON.stringify(updatedCartList));
      return updatedCartList;
    });
  };
  
  

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData;

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
                data-testid="minus"
              >
                <HiOutlineMinusSmall />
                
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
                data-testid="plus"
              >
                <IoAddOutline />
              </button>
            </div>
            <button type="button" className="button add-to-cart-btn" onClick={onClickAdd}>
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    );
  };

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
