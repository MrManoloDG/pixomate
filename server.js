const companieRoutes = require('./api/routes/companieRoutes');
const ownerRoutes = require('./api/routes/ownerRoutes');

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    CompanieModel = require('./api/models/companieModel'),
    FavoriteModel = require('./api/models/favoriteModel'),
    CompanieRoutes = require('./api/routes/companieRoutes'),
    OwnerRoutes = require('./api/routes/ownerRoutes'),
    FavoriteRoutes = require('./api/routes/favoriteRoutes'),
    sequelize = require('./db');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

CompanieRoutes(app);
OwnerRoutes(app);
FavoriteRoutes(app);

module.exports = app;