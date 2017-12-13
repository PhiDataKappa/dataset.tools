require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var path = require('path');
var sha256 = require('sha256');
var base64 = require('base64url');
var request = require("request");
var rp = require('request-promise');
// var base64 = require('url-safe-base64');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser())

app.listen(8080, function(){
  console.log('listening on port 8080');
})
const config = {
  client_id: process.env.CLIENT_ID,
  redirect_uri:('http://localhost:8080'),
  response_type: 'code',
  code_verifier: 'NTM3MDAyOTk0OGEwMjZmOWE0YTA5MGM3MDVjZGFiOWYyOTVmZGQ3ZmY0OTA2OTVlMTQ3MjFiZWIwN2E1Y2E3YQ',
/*
  code_verifier: 'NTM3MDAyOTk0OGEwMjZmOWE0YTA5MGM3MDVjZGFiOWYyOTVmZGQ3ZmY0OTA2OTVlMTQ3MjFiZWIwN2E1Y2E3YQ',
  code_challenge: base64(sha256('NTM3MDAyOTk0OGEwMjZmOWE0YTA5MGM3MDVjZGFiOWYyOTVmZGQ3ZmY0OTA2OTVlMTQ3MjFiZWIwN2E1Y2E3YQ'))
*/
}

app.get('/authorize', function(req, res) {
  // console.log('~~~~~AUTHORIZING', config.code_challenge)
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;
  const endpoint = process.env.AUTHORIZATION_ENDPOINT;
  res.redirect((`https://data.world/oauth/authorize?client_id=${encodeURIComponent(config.client_id)}&redirect_uri=${encodeURIComponent(config.redirect_uri)}&response_type=code&code_challenge_method=plain&code_challenge=${config.code_verifier}`))
});

app.get('/', function (req, res) {
  var code = req.query.code;
  if (code){

    var options = {
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.DATAWORLD_SECRET,
      grant_type: 'authorization_code',
      code_verifier: config.code_verifier
    }

    axios.post('https://data.world/oauth/access_token', options)
      //?code=${encodeURIComponent(code)}&client_id=${encodeURIComponent(config.client_id)}&client_secret=${encodeURIComponent(process.env.DATAWORLD_SECRET)}&grant_type=authorization_code&code_verifier=${encodeURIComponent(config.code_verifier)}`).then((response) =>{
      .then(response => {
      // console.log('line 54&&&&&&&&&&&&&&&', response);
      if (response.data.access_token){
        var at = response.data.access_token
        console.log('response cookie',response);
        res.cookie('cookiename',at,{maxAge:90000,httpOnly:false});
        //res.cookie TODO: attach token to response
        res.sendFile(path.resolve('./app/app.html'))
      }
      else {
        const errorMessage = response.status.message || 'unknown error';
         console.log('-----------else--------------',errorMessage);
      }
    }).catch(err =>{
      console.log('-----------------catch-------------',err)
    })
  }

  //
});

app.get('/getUserDatasets', (req, res) => {
  // console.log(req.query.accessToken, 'getuserdatasets');
  var accessToken = req.query.accessToken;
  var options = { method: 'GET',
    url: 'https://api.data.world/v0/user/datasets/own',
    headers: { authorization: 'Bearer ' + accessToken},
    body: '{}' };

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
    }
    // console.log(body, 'body', response, 'response');
    res.send(body);
  })
//  .then(res.end());
  //var token = req.query
})


// app.use(express.static(path.join(__dirname, '../dll')))
app.get('/dll/renderer.dev.dll.js', (req, res) => {
  console.log('~~~~~~DLLL')
  res.sendFile(path.join(__dirname, '../dll/renderer.dev.dll.js'))
})

app.get('/getdata', (req,res) =>{
  console.log('In server /getdata');
  res.send('hi');
});




// app.use(express.static('./app/app.html'));
// app.get('/',(req,res) => {
//   res.end();
// })
