
//JEFF: inital variables


// JESSICA: Beginning of onclick Event
//function registerUserInput() {
  //QUESTION: Is it best to create a new ID dynamically instead of using Boostrap class?
  $('.form-control').on('click', 'button.submit', function (event) { 
      // $('.form-control').empty();//empty values stored in div
      // event.preventDefault();//don't need event listener since we're changed form submit to button
      console.log("button clicked");
      var newArtist = $('.form-control').val().trim();
      artistsReturned.push(artist);
      //need to add data attr 'search-name' either dynamically or in html
      var newArtist = $(this).data('search-name');
      console.log(arrayName);
      //QUESTION: Query show be in onclick event, so Youtube vid will display when button.submit clicked?

  });
  // JESSICA: End of Event Listenmer



const lastfmAPIKey = "878cd030f66bc70392b2e867264d9bcd";
const youtubeAPIKey = "AIzaSyDTk3_LURGAY8IgkxkywQ-XP2kXW4NMbYI";
const numYouTubeResultsPerArtist = 5;

var testResults = [];
var artist = "Grimes"
var artistsReturned = [];
//JEFF End Initial Variables


//Last.FM ajax call for similar artist
//JEFF prototype things
var SimilarArtist = Class.create({
	initialize: function(name, bio,images,videos){
		this.name = name;
		this.bio = bio;
		this.images = images;
		this.videos = videos;
	},
});
var Artist = Class.create({
	initialize: function(name, similarArtists){
		this.name = name;
		this.similarArtists = similarArtists;
	},
});


//JEFF: End Prototype things


//JEFF: LAST.FM AJAX CALL
$.ajax({
	url: "http://ws.audioscrobbler.com/2.0/?",
	data: {
		method: "artist.getinfo",
		artist: artist,
		api_key: lastfmAPIKey,
		format: "json",
	},
	method: "GET",
}).then(function(response){
	console.log(response);
	searchedArtist = new Artist(artist, response.similar.artist);
	console.log(searchedArtist);
	getSimilarArtists(response.artist.similar.artist);
	
});

//JEFF: END LASTFM AJAX CALL



//JEFF: MISC FUNCTIONS
function getSimilarArtists(artistsArray){
	artistsReturned = [];
	for(var i=0; i<artistsArray.length;i++){
		artistsReturned.push(artistsArray[i].name);
	}

	var bioLoaded = false;

	var numToLoad = artistsReturned.length;
		for(var i=0;i<artistsReturned.length;i++){
	getVideoIds(artistsReturned[i]);
}
console.log(artistsReturned);
}
//JEFF: END MISC FUNCTIONS



var yTresults = [];
var artistQuery = "peral jam";

//JEFF: YOUTUBE API FOR IDS
function getVideoIds(artistQuery){
	$.ajax({
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
	}).then(function(response){
		console.log(response);
		testResults.push(response);
	});

}
//JEFF: END YOUTUBE API
