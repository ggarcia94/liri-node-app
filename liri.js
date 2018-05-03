var dotEnv = require("dotenv").config();
//console.log (dotEnv);

var keys = require("./keys.js");
//console.log(keys);
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var arguments = process.argv;
//console.log(arguments[2]);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = { screen_name: 'Gerardo20877324' };

function getTweets() {
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);  // The favorites.
      console.log("---------------------------------------")
    }
  });
}

function getSpotify(songName) {
  spotify.search({ type: 'track', query: songName }, function (error, data) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log("Artist:", data.tracks.items[i].artists[0].name);
      console.log("Song Name:", data.tracks.items[i].name);
      console.log("Album:", data.tracks.items[i].album.name);
      console.log("Preview URL:", data.tracks.items[i].external_urls.spotify);
      console.log("------------------------------------------------------------------------------")
    }

  });
}

function getOMDB(movieName) {
  request('http://www.omdbapi.com/?t=' + movieName + '&r=json&apikey=trilogy&', function (error, response, body) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    var data = JSON.parse(body);
    console.log('Movie Title:', data.Title);
    console.log('Year Released:', data.Year);
    console.log('IMDB Rating:', data.Ratings[0].Value);
    console.log('Rotten Tomatoes Rating:', data.Ratings[1].Value);
    console.log('Country:', data.Country);
    console.log('Language:', data.Language);
    console.log('Plot:', data.Plot);
    console.log('Actors:', data.Actors);

  });
}

if (arguments[2] === 'my-tweets') {
  getTweets();
} else if (arguments[2] === 'spotify-this-song') {
  if (arguments[3]) {
    var songName = String(arguments[3]);
    getSpotify(songName);
  } else {
    songName = "I saw the sign"
    getSpotify(songName);
  }
} else if (arguments[2] === 'movie-this') {
  if (arguments[3]) {
    var movieName = String(arguments[3]);
    getOMDB(movieName);
  } else {
    movieName = "Mr. Nobody"
    getOMDB(movieName);
  }
} else {
  console.log("Invalid argumet");
}

//getOMDB("Mr. Nobody");
