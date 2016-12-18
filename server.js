const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');

const index = require('./routes');
const api = require('./routes/api');

mongoose.connect('mongodb://localhost/petshot');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(session({
  secret: 'cadillac',
  saveUninitialized: true,
  resave: true,
}))

app.set('view engine', 'ejs');

app.use('/', index);
app.use('/api', api);

const port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log('server is running at http:// localhost: 3000');
})