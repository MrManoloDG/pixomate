const companyRoutes = require('./api/routes/companyRoutes');
const ownerRoutes = require('./api/routes/ownerRoutes');

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    CompanyModel = require('./api/models/companyModel'),
    FavoriteModel = require('./api/models/favoriteModel'),
    CompanyRoutes = require('./api/routes/companyRoutes'),
    OwnerRoutes = require('./api/routes/ownerRoutes'),
    FavoriteRoutes = require('./api/routes/favoriteRoutes'),
    sequelize = require('./db');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

CompanyRoutes(app);
OwnerRoutes(app);
FavoriteRoutes(app);

module.exports = app;