# Description of app for finding cheapest product, basket near a specified location


## Frontend
Two React components: `ProductList` and `Home`

1. **ProductList Component:**
   - It takes a prop `products` and renders a list of products.
   - Each product is displayed with its name and price inside an unordered list (`ul`).

2. **Home Component:**
   - It uses React hooks (e.g., `useState` and `useEffect`) to manage state variables.
   - State variables include `location`, `products`, `cheapestBasket`, `cheapestProduct`, `loading`, and `error`.
   - The `fetchProductList` function is an asynchronous function that fetches a list of products from the server using Axios when the component mounts.
   - The `fetchData` function is a generic function for fetching data from the server. It takes an endpoint and a state-setting function as parameters.
   - The component renders:
      - A heading "Cheapest Basket App."
      - The `ProductList` component, passing the `products` state as a prop.
      - Two sections for displaying the cheapest basket and cheapest product, each with a button to trigger the fetching of data.
      - Loading and error messages based on the API request status.
      - Display of the cheapest basket or product if the data is available.

In summary, the `Home` component is the main component that fetches and displays product lists, the cheapest basket, and the cheapest product. It makes use of the `ProductList` component to render the list of products. The fetching of data is asynchronous, and loading and error states are handled accordingly.

## backend

This code sets up a simple Express.js server that provides an API for finding the cheapest product near a specified location. Here's a short explanation:

1. **Imports:**
   - It imports necessary modules, including `express`, `axios` for making HTTP requests, `config` for configuration management, and `cors` for handling Cross-Origin Resource Sharing.

2. **Express App Setup:**
   - Creates an instance of the Express application.
   - Uses JSON parsing middleware (`express.json()`) and enables CORS (`cors()`).

3. **Configuration:**
   - Retrieves an API key from the `config` module.

4. **Static Product Data:**
   - Defines a static array of products with details such as name, barcode, price, location, and date.

5. **Error Handling Middleware:**
   - Defines a global error-handling middleware to catch and handle errors. It logs the error and sends a generic 500 Internal Server Error response.

6. **API Endpoint (`/api/cheapest-product`):**
   - Defines a GET endpoint for fetching the cheapest product near a specified location.
   - Uses async/await to handle asynchronous operations.
   - Fetches location data from the 2GIS API using the provided location and API key.
   - Calculates the cheapest product based on the products array and the location data.
   - Responds with the result (cheapest product) or an error message.

7. **Async Function (`fetchLocationData`):**
   - Takes a location as a parameter and fetches latitude and longitude data from the 2GIS API using Axios.
   - Parses the response and extracts the necessary location data.
   - Throws an error if the location data is not found.

8. **Function (`calculateCheapestProduct`):**
   - Takes location data and filters the products array to include only those near the specified location.
   - Calculates and returns the cheapest product based on price.

9. **Server Listening:**
   - Starts the server on the specified port (or default port 3001) and logs a message indicating the server is running.

In summary, this Express.js server provides a single API endpoint to find the cheapest product near a specified location. It uses static product data and the 2GIS API to fetch location information. The server handles errors gracefully and logs them.
