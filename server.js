const companieRoutes = require('./api/routes/companieRoutes');

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    CompanieModel = require('./api/models/companieModel');
    CompanieRoutes = require('./api/routes/companieRoutes');
    sequelize = require('./db');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

companieRoutes(app);

module.exports = app;