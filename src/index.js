const express = require('express');
require('dotenv').config();
require('express-async-errors');

const app = express();
const port = 3001;

app.use(express.json());

const cors = require('./app/middlewares/cors');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');

app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
