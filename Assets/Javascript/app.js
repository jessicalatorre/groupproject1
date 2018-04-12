const lastfmAPIKey = "878cd030f66bc70392b2e867264d9bcd";
const youtubeAPIKey = "AIzaSyDTk3_LURGAY8IgkxkywQ-XP2kXW4NMbYI";
const numYouTubeResultsPerArtist = 5;
var testResults = [];
var artist = "Grimes";
var artistsReturned = [];
//JEFF End Initial Variables
//Last.FM ajax call for similar artist
//JEFF prototype things; work in progress
// SimilarArtist.prototype = {
//     initialize: function (name, bio, images, videos) {
//         this.name = name;
//         this.bio = bio;
//         this.images = images;
//         this.videos = videos;
//     }
// }
// Artist.prototype = {
//     initialize: function (name, similarArtists) {
//         this.name = name;
//         this.similarArtists = similarArtists;
//     }
// }
//JEFF: End Prototype things
//  JESSICA: Beginning of onclick Event
    jQuery(document).on('click', '#submitButton', function(){
        console.log("button clicked");
        artist = jQuery('#userSearch').val().trim();
        console.log(artist);
        //JESSICA: End of onclick Event
        //JEFF: LAST.FM AJAX CALL
        jQuery.ajax({
            url: "http://ws.audioscrobbler.com/2.0/?",
            data: {
                method: "artist.getinfo",
                artist: artist,
                api_key: lastfmAPIKey,
                format: "json",
            },
            method: "GET",
        }).then(function (response) {
            console.log(response);
            
            getSimilarArtists(response.artist.similar.artist);
        });
    });
    //JEFF: END LASTFM AJAX CALL
    //JEFF: MISC FUNCTIONS
    function getSimilarArtists(artistsArray) {
        artistsReturned = [];
        for (var i = 0; i < artistsArray.length; i++) {
            artistsReturned.push(artistsArray[i].name);
        }
        var bioLoaded = false;
        var numToLoad = artistsReturned.length;
        for (var i = 0; i < artistsReturned.length; i++) {
            getVideoIds(artistsReturned[i]);
        }
        console.log(artistsReturned);
    }
    //JEFF: END MISC FUNCTIONS
    var yTresults = [];
    var artistQuery = "peral jam";
    //JEFF: YOUTUBE API FOR IDS
    function getVideoIds(artistQuery) {
        jQuery.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?',
            data: {
                part: 'snippet',
                q: artistQuery,
                type: 'video',
                maxResults: numYouTubeResultsPerArtist,
                videoCategoryId: '10', //sets category to music only
                videoEmbeddable: 'true',
                key: youtubeAPIKey,
            },
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            testResults.push(response);
        });
    }
//JEFF: END YOUTUBE API
