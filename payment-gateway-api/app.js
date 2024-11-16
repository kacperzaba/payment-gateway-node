const express = require('express');
const router = require('./routes');
const apiErrorHandler = require('./error/api-error-handler');

const app = express();
app.use(express.json());
app.use('/', router);

app.use(apiErrorHandler);

module.exports = app;