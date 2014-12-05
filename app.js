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
});

/******************************************************************************
  ROUTES
******************************************************************************/
app.get('/', function(req, res, next) {
  var query = client.query( 'SELECT * FROM happyPeople', function(e, happy) {
    var query = client.query( 'SELECT * FROM sadPeople', function(e, sad) {
      res.render('mapUI', {happyPeople: happy.rows, sadPeople: sad.rows});
    });
  });
});

app.get('/addPeople', function(req, res, next) {
  res.render('addPeople');
});

app.post('/addPeople', function(req, res, next) {
  var postData = pD = req.body;

  if(!pD.personType || !pD.lat || !pD.lon) {
    return res.render('addPeople', {errorMessage: 'Hey! You have to fill everything in!', postData: pD});
  }

  if(['happyPeople', 'sadPeople'].indexOf(pD.personType) < 0) {
    return res.render('addPeople', {errorMessage: 'We don\'t believe in people like that :o', postData: pD});
  }

  console.log(insertQuery(pD));

  var query = client.query( insertQuery(pD), function(e, row) {
    return res.render('addPeople', {successMessage: insertQuery(pD)});
  });
});

/******************************************************************************
  UTILITY FUNCTIONS
******************************************************************************/
function insertQuery(pD) {
  return ['INSERT INTO ', pD.personType, ' (coord) VALUES (\'', pD.lat, ', ', pD.lon, '\');'].join('');
}

/******************************************************************************
  YIPPEE! START THE SERVER!
******************************************************************************/
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %s', app.get('port'));
});
