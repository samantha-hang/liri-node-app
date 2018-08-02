require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");
var command = process.argv[2];
var search = process.argv[3];


console.log(command);
console.log(search);

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function runCommand(command, search){
    switch(command){
        case 'my-tweets':
            showTweets();
            break;
        case 'spotify-this-song':
            showSong(search);
            break;
        case 'movie-this':
            showMovie(search);
            break;
        default:
            showRandom();
console.log('this works');
    }

}

runCommand(command, search);

function showTweets(){
    // * This will show your last 20 tweets and when they were created at in your terminal/bash window.
    var params = {screen_name: 'SamSam16416883'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // console.log(tweets[0].created_at);
        for (var i=0; i<tweets.length;i++){
            var tweet = {
                createdAt: tweets[i].created_at,
                text: tweets[i].text
            };
            console.log(tweet);        
        } 
    }
});
}

function showSong(songName){
//     * This will show the following information about the song in your terminal/bash window
     
//     * Artist(s)
    
//     * The song's name
    
//     * A preview link of the song from Spotify
    
//     * The album that the song is from

//   * If no song is provided then your program will default to "The Sign" by Ace of Base.
    if(!songName){
        songName = 'The Sign Ace of Base'
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {

        if (err) {
        return console.log('Error occurred: ' + err);
        }
            var song = {
                artist: data.tracks.items[0].artists[0].name,
                songName: data.tracks.items[0].name,
                previewLink: data.tracks.items[0].preview_url,
                album: data.tracks.items[0].album.name
            }
        console.log(song);
    });
}

function showMovie(movieName){
    // * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

//     * Title of the movie.
//     * Year the movie came out.
//     * IMDB Rating of the movie.
//     * Rotten Tomatoes Rating of the movie.
//     * Country where the movie was produced.
//     * Language of the movie.
//     * Plot of the movie.
//     * Actors in the movie.
//   ```

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

var searchArr = process.argv.slice(3);
var search = searchArr.join('+');

// console.log(search);


var url = "http://www.omdbapi.com/?t="+ search + "&y=&plot=short&apikey=trilogy";

// Then run a request to the OMDB API with the movie specified
request(url, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // console.log(JSON.parse(body));
    var movie = {
        title: (JSON.parse(body).Title),
        year: (JSON.parse(body).Year),
        imdbRating: (JSON.parse(body).imdbRating),
        rottenTomatoes: (JSON.parse(body).Ratings[2]),
        country: (JSON.parse(body).Country),
        language:(JSON.parse(body).Language),
        plot:(JSON.parse(body).Plot),
        actors: (JSON.parse(body).Actors)
        
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    // console.log(JSON.parse(body).Year);
            }
        console.log(movie);
        }
    });
 }

function showRandom(){
    //    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
    //  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
    //  * Feel free to change the text in that document to test out the feature for other commands.
// fs is a core Node package for reading and writing files
    var fs = require("fs");

    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

        // most of the time, it's utf8

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // ^ comes back as string

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // ^ turns string into an array

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        runCommand(dataArr[0], dataArr[1]);
    });

}

// BONUS

function logData(){
    // * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

    // * Make sure you append each command you run to the `log.txt` file. 
    
    // * Do not overwrite your file each time you run a command.
}