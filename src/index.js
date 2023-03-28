const express = require('express');
require('dotenv').config();
require('express-async-errors');

const app = express();
const port = 3000;

app.use(express.json());

const routes = require('./routes');

app.use(routes);
app.use((error, req, res, next) => {
  console.log('Error Handler -', error);
  res.sendStatus(500);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
