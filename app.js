/******************************************************************************
  IMPORTING STUFF
******************************************************************************/
var express = require('express');
var pg = require('pg');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/******************************************************************************
  APPLICATION CONFIGURATION
******************************************************************************/
var app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse cookies
app.use(cookieParser());

// Use JADE as the view engine
app.set('view engine', 'jade');

// Get the port
app.set('port', (process.env.PORT || 5000));

/******************************************************************************
  DATABASE CONNECTION
******************************************************************************/
var client = new pg.Client({
    user: "twhaizfycqcdcw",
    password: "io1A6aoh7FVfk4OB58eSwm_q4P",
    database: "dca3vt6esl5tji",
    port: 5432,
    host: "ec2-54-83-204-244.compute-1.amazonaws.com",
    ssl: true
});

client.connect(function(err, client) {
  if(err) {
    return console.log('Error connecting to DB', err);
  }

  var query = client.query('SELECT * FROM happyPeople');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});

/******************************************************************************
  ROUTES
******************************************************************************/
app.get('/*', function(req, res, next) {
  res.render('mapUI');
});

/******************************************************************************
  YIPPEE! START THE SERVER!
******************************************************************************/
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %s', app.get('port'));
});
