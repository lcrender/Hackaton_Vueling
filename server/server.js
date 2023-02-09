const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors());

// Settings
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/routes'));

module.exports = app;