const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(routes.user);
app.use(routes.products);
app.use(routes.customerOrders);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
