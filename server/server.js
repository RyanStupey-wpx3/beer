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


app.get('/api/testt', (req, res) => {
    // axios.get(`https://api.brewerydb.com/v2/beer/oeGSxs?key=${process.env.BING_KEY}`).then(response => {
    //     console.log(response.data);
    // })
})





const PORT = 3535;

app.listen(PORT, () => console.log('Listening on port ' + PORT))
