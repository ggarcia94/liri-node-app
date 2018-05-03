var dotEnv = require("dotenv").config();
//console.log (dotEnv);

var keys = require("./keys.js");
//console.log(keys);
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var arguments = process.argv;
console.log(arguments[2]);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

client.get('favorites/list', function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites.
    //console.log(response);  // Raw response object.
  });