import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';

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
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
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
          <Row>
            {products.map((product) => (
              <Col
                key={product.name}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-3"
              >
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
