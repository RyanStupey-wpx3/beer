require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controller');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/test', controller.test);


// External API Passthrough
app.get('/api/beer/:name', (req, res) => {
    axios.get(`https://api.brewerydb.com/v2/beers/?name=${req.params.name}&withBreweries=Y&key=${process.env.BING_KEY}`)
    .then( response => res.json(response.data) ).catch(console.log);
})





const PORT = 3535;

app.listen(PORT, () => console.log('Listening on port ' + PORT))
