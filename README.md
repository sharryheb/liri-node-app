# liri-node-app


1. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

2. To retrieve the data that will power this app, it sends requests using the axios package to the Bands in Town, Spotify and OMDB APIs. 

3. To run LIRI, run the following command, replacing the parts in "<>" accordingly:
    1. open a command line prompt and type "node liri `<command> <query>`"
    2. "command" can be any one of: concert-this, movie-this, spotify-this-song, or do-what-it-says.
    3. "query" is what you want to search for, based on the command you entered. 
        1. concert-this: your query should be a band/singer's name.
        2. movie-this: your query should be the title of a movie.
        3. spotify-this-song: your query should be the name of a song.
        4. do-what-it-says: this command does not take a query. Instead, it will read both a command and a query from the local "random.txt" file located in the same directory as the script. The file should contain one line, composed of a command from i-iii above and a query, separated by a comma.
    4. Results of the command/query will be logged to the console and also logged in the log.txt file, also local to the script. 

4. Video Demo: https://drive.google.com/file/d/1w1Ew00MNAj4ZYOdFgHh8-avmxMBT9ADk/view?usp=sharing

5. Technologies: Node.js (with the node-spotify-api, axios, moment, and dotenv packages), Bands in Town Artist Events API.

