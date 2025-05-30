import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }; // Update loading to true while keeping the previous state the same
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload }; // Update product with the data from the backend found in ( action.payload )
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }; // Sets the error field with the data from the backend
    default:
      return state; // returns current state
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { name } = params; // get the name parameter from the url (params)

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });

  // Runs the function once after rendering the components
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/name/${name}`); // Sends an AJAX request to the requested address
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [name]);

  const { state, dispatch: ctxDispatch } = useContext(Store); // Renamed dispatch to ctxDispatch, short for contextDispatch
  const { cart } = state; // deconstruct the cart prop from state

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry! This item is currently out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger"> {error} </MessageBox>
  ) : (
    <div>
      <h1> {name} </h1>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1> {product.name} </h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>

            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>

            <ListGroup.Item>
              Description : <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              {/* Made to be flush to remove outer borders and rounded corners, 
              making list group items appear edge-to-edge within a contain, such as a card */}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col> Price: </Col>
                    <Col> ${product.price} </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col> Status: </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success"> In Stock </Badge>
                      ) : (
                        <Badge bg="danger"> Unavailable </Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
