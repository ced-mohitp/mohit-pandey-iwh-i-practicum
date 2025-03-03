const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na1-cbe73927-2796-4212-854f-c20fb1f6e95a';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

app.get('/', async (req, res) => {
    const cars = 'https://api.hubspot.com/crm/v3/objects/cars?properties=name,model,details';
    const headers = {
        'Authorization': `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(cars, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Cars | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here


app.get('/update-cobj', async (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here


app.post('/update-cobj', async (req, res) => {
    
    const update = {
        properties: {
            "model" : req.body.model,
            "details" : req.body.details,
            "name" : req.body.name
        }
    }
    const objectId = '2-18734655';
    const updateCar = `https://api.hubapi.com/crm/v3/objects/${objectId}`;
    const headers = {
        'Authorization': `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        try { 
            await axios.post(updateCar, update, { headers } );
            res.redirect('/');
        } catch(err) {
            console.error(err);
        }      
    } catch (error) {
        console.error(error);
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));