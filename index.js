const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import cors middleware
const app = express();
const port = 8080;

app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Enable JSON parsing for POST requests

// Serve static files (e.g., HTML, CSS, JS) from the "public" folder
app.use(express.static('public'));

// Proxy route to handle forwarding the API request
app.get('/getSubmittalInfo', async (req, res) => {
    const { id, categoryId } = req.query;

    if (!id || !categoryId) {
        return res.status(400).json({ message: 'id and categoryId are required' });
    }

    try {
        const apiUrl = `https://siralamericas.com/Modular/GetSubmittalInfo?id=${id}&categoryId=${categoryId}`;

        // Fetch data from the external API
        const response = await axios.get(apiUrl);

        // Log the data to check what you're getting
        console.log('API Response:', response.data);

        // Send the response data back to the client
        res.json(response.data);
    } catch (error) {
        // Detailed error logging
        console.error('Error occurred while fetching data from external API:', error.message);
        console.error('Full error response:', error.response ? error.response.data : error.message);

        // Send back a detailed error message
        res.status(500).json({ message: 'Error fetching data from external API', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
