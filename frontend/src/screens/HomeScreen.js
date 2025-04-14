import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import data from '../data';

function HomeScreen() {
  const [products, setProducts] = useState([]); // use to manage the state of the products on the backend

  // Runs the function once after rendering the components
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products'); // Sends an AJAX request to the requested address
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1> List of Products </h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.name}>
            <Link to={`/product/${product.name}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.name}`}>
                <p> {product.name} </p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button> Add to cart </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
