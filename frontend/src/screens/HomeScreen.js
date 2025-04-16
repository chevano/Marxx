import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }; // Update loading to true while keeping the previous state the same
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }; // Update products with the data from the backend found in ( action.payload )
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }; // Sets the error field with the data from the backend
    default:
      return state; // returns current state
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });

  // Runs the function once after rendering the components
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products'); // Sends an AJAX request to the requested address
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1> List of Products </h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
