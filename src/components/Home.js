import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './Productlist';

const Home = () => {
  const [location, setLocation] = useState('Астана');
  const [products, setProducts] = useState([]);
  const [cheapestBasket, setCheapestBasket] = useState(null);
  const [cheapestProduct, setCheapestProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching product list.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (endpoint, setState) => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint, {
        params: { location, date: new Date().toISOString() },
      });
      setState(response.data);
    } catch (error) {
      setError(`Error fetching ${endpoint}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Cheapest Basket App</h1>

      <ProductList products={products} />

      <div>
        <h2>Cheapest Basket</h2>
        <button onClick={() => fetchData('/api/cheapest-basket', setCheapestBasket)}>Fetch Cheapest Basket</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {cheapestBasket && <p>Cheapest Basket: ${cheapestBasket.result}</p>}
      </div>

      <div>
        <h2>Cheapest Product</h2>
        <button onClick={() => fetchData('/api/cheapest-product', setCheapestProduct)}>Fetch Cheapest Product</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {cheapestProduct && <p>Cheapest Product: {cheapestProduct.result}</p>}
      </div>
    </div>
  );
};

export default Home;
