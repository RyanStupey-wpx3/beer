require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controller');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/mybeers', controller.read);
app.post('/api/mybeers', controller.create);
app.put('/api/mybeers/:id', controller.update);
app.delete('/api/mybeers/:id', controller.delete);


// External API Passthrough
app.get('/api/beer/:name', (req, res) => {
    axios.get(`https://api.brewerydb.com/v2/beers/?name=${req.params.name}&withBreweries=Y&key=${process.env.BING_KEY}`)
    .then( response => res.status(200).json(response.data) ).catch(err => console.log('Error: ' + err));
})

app.get('/api/beer/random/random', (req, res) => {
    axios.get(`https://api.brewerydb.com/v2/beer/random?withBreweries=Y&key=${process.env.BING_KEY}`)
    .then( response => {
        res.status(200).json(response.data)
    } ).catch(err => console.log('Error: ' + err));
})

app.get('/api/breweries/:name', (req, res) => {
    axios.get(`https://api.brewerydb.com/v2/breweries/?name=${req.params.name}&key=${process.env.BING_KEY}`)
    .then( response => res.status(200).json(response.data) ).catch(err => console.log('Error: ' + err));
})

app.get('/api/brewery/random/random', (req, res) => {
    axios.get(`https://api.brewerydb.com/v2/brewery/random?key=${process.env.BING_KEY}`)
    .then( response => res.status(200).json(response.data) ).catch(err => console.log('Error: ' + err));
})





const PORT = 3535;

app.listen(PORT, () => console.log('Listening on port ' + PORT))
