const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./services/index');
const users = require('./services/users/router');
const calendars = require('./services/calendars/router');
const events = require('./services/events/router');

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/calendars', calendars);
app.use('/events', events);

module.exports = app;
