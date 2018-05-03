//Everything required for this app to work
var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

//Let's parse the arguments and put them in a variable
var arguments = process.argv;
var command = arguments[2];
var value = arguments[3];

//Create the Spotify and Twitter classes
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//My twitter ID
var params = { screen_name: 'Gerardo20877324' };

//Twitter API function
function getTweets() {
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
      console.log("---------------------------------------")
    }
  });
}

//Spotify API functiom
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

//OMDB API function.  Uses the request package to call the API
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

function getArgsFromFile() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // Run the app from the arguments in the file
    runLiri (dataArr[0], dataArr[1]);
    
  });
}


//Function call to run our APP
function runLiri(argOne, argTwo) {
  if (argOne === 'my-tweets') {
    getTweets();
  } else if (argOne === 'spotify-this-song') {
    if (argTwo) {
      var songName = String(argTwo);
      getSpotify(songName);
    } else {
      songName = "I saw the sign"
      getSpotify(songName);
    }
  } else if (argOne === 'movie-this') {
    if (argTwo) {
      var movieName = String(argTwo);
      getOMDB(movieName);
    } else {
      movieName = "Mr. Nobody"
      getOMDB(movieName);
    }
  } else {
    console.log("Invalid command");
  }
}

//Check if we have to read arguments from file or if we can run app from CLI arguments
if (command === 'do-what-it-says') {
  getArgsFromFile();
} else {
  runLiri(command, value);
}