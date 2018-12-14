// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp api endpoint for datestrings
app.get("/api/timestamp/:datestring", (req, res) => {
  const date = new Date(req.params.datestring)
  const validDate = date.valueOf() ? true : false
  if (validDate) {
    res.json({
      "unix": date.valueOf(), 
      "utc": date.toUTCString()
    })
  } else {
    res.json({"error" : "Invalid Date" })
  }
})

// timestamp api endpoint when empty
app.get("/api/timestamp", (req, res) => {
  const date = new Date()
  res.json({
    "unix": date.valueOf(), 
    "utc": date.toUTCString()
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
