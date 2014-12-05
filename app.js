/******************************************************************************
  IMPORTING STUFF
******************************************************************************/
var express = require('express');

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
