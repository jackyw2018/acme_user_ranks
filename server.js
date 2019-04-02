const path = require('path');
const express = require('express');
const app = express();

// Logging middleware
const morgan = require('morgan');
app.use(morgan('dev'));

const { syncAndSeed } = require('./db');

const port = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.use('/api', require('./api'));

syncAndSeed().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});
