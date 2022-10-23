const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const countryRoutes = require('./routes/country.routes');

// MIDDLEWARE START

// Setting cors
app.use(
    cors({
        origin: '*',
    })
);

// Parsing JSON & formUrlEncoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serving static files (css, images etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', userRoutes);
app.use('/api/country', countryRoutes);

module.exports = app;
