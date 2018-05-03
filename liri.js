var dotEnv = require("dotenv").config();
//console.log (dotEnv);

var keys = require("./keys.js");
//console.log(keys);
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var arguments = process.argv;
//console.log(arguments[2]);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = {screen_name: 'Gerardo20877324'};

function getTweets() {
//client.get('favorites/list', function (error, tweets, response) {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) throw error;
  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);  // The favorites.
    console.log("---------------------------------------")

  }
  //console.log(tweets);  // The favorites.
  //console.log(response);  // Raw response object.
});
}

if (arguments[2] === 'my-tweets') {
  getTweets();
} else {
  console.log("Invalid argumet");
}