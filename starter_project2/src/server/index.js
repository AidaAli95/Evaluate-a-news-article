var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));

console.log(__dirname);

// Variables for url and api key
const mcUrl= "https://api.meaningcloud.com/sentiment-2.1";
const sentKey= process.env.API_KEY;

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//Post request
app.post('/api', function (req, res) {
    //Create a new object with data
    const articleData = new FormData();
    articleData.append('key', process.env.API_KEY);
    articleData.append('url', req.body.url);
    articleData.append('lang', 'en');

    /*const requestOptions = {
        method: 'POST',
        body: articleData,
        redirect: 'follow'
    };*/
    
    async function fetchSentimentAnalysis() {
        try {
            // Send the request using fetch and await the response
            const response = await fetch(mcUrl, {
                method: 'POST', // Use POST method
                body: articleData,     // URL-encoded parameters
                redirect: 'follow'
                });
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                
                // Parse the response as JSON
                const data = await response.json();
                
                // Log the response data
                console.log('API Response:', JSON.stringify(data, null, 2));
                res.send(data)
                
            } catch (error) {
                // Handle any errors (network, JSON parsing, etc.)
                console.error('Error during API request:', error);
            }
        }
        
        // Call the async function
        fetchSentimentAnalysis();

        //console.log('data');
        //res.send(data);
});


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});