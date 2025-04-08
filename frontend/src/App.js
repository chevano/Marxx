import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">Marxx</a>
      </header>
      <main>
        <h1> List of Products </h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.name}>
              <a href={`/product/${product.name}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-info">
                <p> {product.name} </p>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button> Add to cart </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
