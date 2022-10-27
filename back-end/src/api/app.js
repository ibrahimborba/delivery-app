const express = require('express');
const routes = require('../routes');

const app = express();

app.use(express.json());

app.use('/login', routes.user);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
