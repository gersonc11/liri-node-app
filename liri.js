require("dotenv").config();
const axios = require('axios');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const moment = require('moment');
var spotify = new Spotify(keys.spotify);
const fs = require('fs');

let getBand = () => {
    var artist = process.argv.splice(3, process.argv.length).join(' ');
    var bands = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(bands)
        .then(response => { 
            if (response) {
                for (i = 0; i < response.data.length; i++) {
                    console.log('Venue: ' + response.data[i].venue.name)
                    console.log('Location :' + response.data[i].venue.city + ', ' + response.data[i].venue.country)
                    console.log('Date: ' + moment(response.data[i].datetime).format('MM/DD/YYYY') + '\n')
                }
            }
            else {
                console.log("No upcoming shows.")
            }
        }).catch(error => {
            console.log(error)
        })
};

let spotifySong = () => {
    var song = process.argv.splice(3, process.argv.length).join(' ');
    spotify.search({ type: 'track', query: song }, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0, j = 0; i < data.tracks.items.length; i++) {
            console.log('Artist(s): ' + data.tracks.items[i].artists[j].name);
            console.log('Song Name: ' + data.tracks.items[i].name);
            console.log('Preview: ' + data.tracks.items[i].href);
            console.log('Album Name: ' + data.tracks.items[i].album.name + '\n');
        }
    });
}

let getMovie = () => {
    var movieName = process.argv.splice(3, process.argv.length).join(' ');
    var movie = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy"
    axios.get(movie)
        .then(response => {
            if (movieName) {
                console.log('Title: ' + response.data.Title)
                console.log('Released: ' + response.data.Year)
                console.log('IMDB Rating: ' + response.data.Ratings[0].Value)
                console.log('Rotten Tomatoes: ' + response.data.Ratings[1].Value)
                console.log('Production Country: ' + response.data.Country)
                console.log('Languages: ' + response.data.Language)
                console.log('Plot: ' + response.data.Plot)
                console.log('Actors: ' + response.data.Actors + '\n')
                // * Year the movie came out.
                // * IMDB Rating of the movie.
                // * Rotten Tomatoes Rating of the movie.
                // * Country where the movie was produced.
                // * Language of the movie.
                // * Plot of the movie.
                // * Actors in the movie.
            }
            else {
                axios.get("http://www.omdbapi.com/?t=Mr.Nobody&apikey=trilogy")
                    .then(response => {
                        console.log('Title: ' + response.data.Title)
                        console.log('Released: ' + response.data.Year)
                        console.log('IMDB Rating: ' + response.data.Ratings[0].Value)
                        console.log('Rotten Tomatoes: ' + response.data.Ratings[1].Value)
                        console.log('Production Country: ' + response.data.Country)
                        console.log('Languages: ' + response.data.Language)
                        console.log('Plot: ' + response.data.Plot)
                        console.log('Actors: ' + response.data.Actors + '\n')
                    });
            }
        }).catch(error => {
            throw error
        })
}

let getText = () => {
    fs.readFile('random.txt', 'utf8', (error, data) => {
        console.log(data)
        var newData = data.split(',')
        console.log(newData)
        var action = newData[0];
        var item = newData[1]
        console.log(action + ' ' + item);
        process.argv[2] = action;
        process.argv[3] = item;
        var toDo = process.argv[2];
        var actionCommand = process.argv[3];
        // var rows = data.split('\r\n')
        // for (i = 0; i < rows.length; i++) {
            // var columns = rows[i].split(',')
            // console.log(columns)
            // var action = columns[0];
            // console.log(action)
            // var item = columns[1].slice(1, -1);
            // console.log(item)
            // console.log(item)

            switch (toDo) {
                case 'concert-this':
                    getBand(actionCommand);
                    break;

                case 'spotify-this-song':
                    spotifySong(actionCommand);
                    break;

                case 'movie-this':
                    getMovie(actionCommand);
                    break;
            }
        // }

    })
}


if (process.argv[2] === 'concert-this') {
    getBand();
}
else if (process.argv[2] === 'spotify-this-song') {
    spotifySong();
}
else if (process.argv[2] === 'movie-this') {
    getMovie();
}
else if (process.argv[2] === 'do-what-it-says') {
    getText();
}
else {
    throw error
};