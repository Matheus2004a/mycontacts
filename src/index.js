const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

const routes = require('./routes');

app.use(routes);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
