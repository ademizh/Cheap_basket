const express = require('express');
const axios = require('axios');
const config = require('config'); // Add this line to import the config module
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const API_KEY = config.get('2ec92127-2e32-4692-90f2-f0cb8125a3ce');
const products = [
  { name: 'Product A', barcode: '123456', price: 10, place: 'Near 37.1234, -122.4567', date: '2023-01-01' },
  { name: 'Product B', barcode: '789012', price: 15, place: 'Near 37.5678, -121.9876', date: '2023-01-02' },
  { name: 'Product C', barcode: '345678', price: 8, place: 'Near 37.8765, -122.3456', date: '2023-01-01' },
  { name: 'Product D', barcode: '901234', price: 12, place: 'Near 37.4321, -122.8765', date: '2023-01-03' },
  { name: 'Product E', barcode: '567890', price: 20, place: 'Near 37.6543, -122.7654', date: '2023-01-02' },
];

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/api/cheapest-product', async (req, res, next) => {
  try {
    const location = req.query.location;
    const locationData = await fetchLocationData(location);

    if (!locationData) {
      throw new Error('Location data not found.');
    }

    const cheapestProduct = calculateCheapestProduct(locationData);
    res.json({ result: cheapestProduct });
  } catch (error) {
    next(error);
  }
});

async function fetchLocationData(location) {
  try {
    const response = await axios.get(`https://catalog.api.2gis.com/3.0/items?q=${encodeURIComponent(location)}&key=${API_KEY}`);
    const locationData = response.data.result[0];

    if (locationData) {
      return {
        latitude: locationData.lat,
        longitude: locationData.lon,
      };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error('Error fetching location data from 2GIS API');
  }
}

function calculateCheapestProduct(locationData) {
  const filteredProducts = products.filter((product) => product.place.includes(`Near ${locationData.latitude}, ${locationData.longitude}`));

  if (filteredProducts.length === 0) {
    throw new Error('No product found near the specified location.');
  }

  return filteredProducts.reduce((minProduct, currentProduct) => (currentProduct.price < minProduct.price ? currentProduct : minProduct));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
