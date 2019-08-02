require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const fs = require('fs');
const Spotify = require('node-spotify-api');

var request = process.argv[2];
var topic = process.argv[3];

ParseRequest(request, topic);

function ParseRequest(request, topic)
{
    switch (request)
    {
        case "concert-this":
            FindConcerts();
            break;
        case "spotify-this-song":
            FindSong();
            break;
        case "movie-this":
            FindMovie();
            break;
        case "do-what-it-says":
            DoWhatItSays();
            break;
    }
}

var logString = "";

function FindConcerts()
{
    if (!topic) topic = "Pearl Jam";

    axios.get("https://rest.bandsintown.com/artists/" + topic + "/events?app_id=codingbootcamp")
        .then(function (response)
        {
            logString = "==================================================================\n";
            logString += "request: " + request + "\n";
            logString += "query: " + topic + "\n";
            
            var events = response.data;
            for(event in events)
            {
                logString += "\nVenue Name: " + events[event].venue.name;
                logString += "\nLocation: " + events[event].venue.city + ", " + events[event].venue.region;
                logString += "\nDate: " + moment(events[event].datetime).format("MM/DD/YYYY");
                logString += "\n*************";
            }
            logString += "\n\n";
            Output();
        }
    );
}

function FindSong()
{
    if (!topic) topic = "The Sign";

    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: '"' + topic + '"', limit: 5 })
    .then(function (response)
    {
        logString = "==================================================================\n";
        logString += "request: " + request + "\n";
        logString += "query: " + topic + "\n";

        var songs = response.tracks.items;
        for (song in songs)
        {
            var artists = songs[song].artists;
            var artistString = "";
            for (artist in artists)
            {
                artistString += artists[artist].name;
                artistString += "/"
            }
            artistString = artistString.slice(0, artistString.lastIndexOf("/"));
            logString += "\nArtist: " + artistString;
            logString += "\nSong: " + songs[song].name;
            logString += "\nLink: " + songs[song].preview_url;
            logString += "\nAlbum: " + songs[song].album.name;
            logString += "\n*************";
        }
        logString += "\n\n";
        Output();
    });
}

function FindMovie()
{
    if (!topic) topic = "Mr. Nobody";

    axios.get("http://www.omdbapi.com/?apikey=trilogy&type=movie&t=" + topic)
    .then(function (response)
    {
        var movie = response.data;

        logString = "==================================================================\n";
        logString += "request: " + request + "\n";
        logString += "query: " + topic + "\n";
        logString += "\nTitle: " + movie.Title;
        logString += "\nYear: " + movie.Year;
        logString += "\nIMDB: " + movie.Ratings[0].Value;
        logString += "\nRotten Tomatoes: " + movie.Ratings[1].Value;
        logString += "\nCountries: " + movie.Country;
        logString += "\nLanguage: " + movie.Language;
        logString += "\nPlot: " + movie.Plot;
        logString += "\nActors: " + movie.Actors;
        logString += "\n\n";
        Output();
    });
}

function DoWhatItSays()
{
    fs.readFile("./random.txt", "UTF8", function(err,file)
    {
        file = file.replace(/"/gi, '',).split(",");
        request = file[0];
        topic = file[1];
        ParseRequest(request, topic);
    });
}

function Output()
{
    console.log(logString);
    fs.appendFile("./log.txt", logString, function(err)
    {
        if (err)
            console.log(err);
    });
}