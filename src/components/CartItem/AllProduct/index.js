import { useState, useEffect, useCallback} from 'react';
import Cookies from 'js-cookie';
import ProductCard from "../ProductCard";
import ProductsHeader from '../ProductsHeader';


const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
];

const AllProduct = () => {
  const [productList, setProductList] = useState([]);
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
  

  const updateActiveOptionId = (optionId) => {
    setActiveOptionId(optionId);
  };

  const getProductList = useCallback(async () => {
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = fetchedData.products.map((product) => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        setProductList(updatedData);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [activeOptionId]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  const renderProduct = () => {
    return (
      <div>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          updateActiveOptionId={updateActiveOptionId}
        />
        <ul>
          {productList.map((eachItem) => (
            <ProductCard key={eachItem.id} productData={eachItem} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      {renderProduct()}
    </div>
  );
};

export default AllProduct;
