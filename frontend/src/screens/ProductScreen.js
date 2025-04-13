import { useParams } from 'react-router-dom';

function ProductScreen() {
  const params = useParams();
  const { name } = params; // get the name parameter from the url (params)
  return (
    <div>
      <h1> Product Screen </h1>
      <p> {name} </p>
    </div>
  );
}

export default ProductScreen;
