const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// routes
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
// Error handling
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
  next();
});

app.use('/api/places', placesRoutes); // => /api/places/...
app.use('/api/users', usersRoutes); // => /api/user/...

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error has occurred.' });
});

// Database connection.
mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('** Database connected.. **');
    app.listen(5000);
  })
  .catch((err) => {
    console.error('connection error:', err);
  });
