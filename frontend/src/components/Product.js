import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;

  return (
    <Card>
      <Link to={`/product/${product.name}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.name}`}>
          <Card.Title> {product.name} </Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{<strong>${product.price}</strong>}</Card.Text>
        <Button> Add to cart </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
