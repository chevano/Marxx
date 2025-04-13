import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1> List of Products </h1>
      <div className="products">
        {data.products.map((product) => (
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
