const lastfmAPIKey = "878cd030f66bc70392b2e867264d9bcd";
const youtubeAPIKey = "AIzaSyDTk3_LURGAY8IgkxkywQ-XP2kXW4NMbYI";



const sampleURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json";

var artist = "Fish"
var artistsReturned = [];
//Last.FM ajax call for similar artist
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
	getSimilarArtists(response.artist.similar.artist);
});

function getSimilarArtists(artistsArray){
	artistsReturned = [];
	for(var i=0; i<artistsArray.length;i++){
		artistsReturned.push(artistsArray[i].name);
	}
console.log(artistsReturned);
}




var yTresults = [];
var artistQuery = "peral jam";

 /** JEFF: GOOGLE'S MAGIC MAKE DO WORK GOOD CODE FOR YOUTUBE
 	JEFF: GOD HELP US ALL**/

  /***** START BOILERPLATE CODE: Load client library, authorize user. *****/

   // Global variables for GoogleAuth object, auth status.
   var GoogleAuth;

   /**
    * Load the API's client and auth2 modules.
    * Call the initClient function after the modules load.
    */
   function handleClientLoad() {
     gapi.load('client:auth2', initClient);
   }

   function initClient() {
   	console.log("in client init");
     // Initialize the gapi.client object, which app uses to make API requests.
     // Get API key and client ID from API Console.
     // 'scope' field specifies space-delimited list of access scopes

     gapi.client.init({
         'apiKey': youtubeAPIKey,
         'clientId': '130884740564-tkjb24s0p7bhrptrjbins2nlc4cp8h7m.apps.googleusercontent.com',
         'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
          'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
     }).then(function () {
     console.log("in client init then");
       GoogleAuth = gapi.auth2.getAuthInstance();

       // Listen for sign-in state changes.
       GoogleAuth.isSignedIn.listen(updateSigninStatus);

       // Handle initial sign-in state. (Determine if user is already signed in.)
       setSigninStatus();

       // Call handleAuthClick function when user clicks on "Authorize" button.
       $('#execute-request-button').click(function() {
       	console.log("auth clicked");
         handleAuthClick(event);
       }); 
     });
   }

   function handleAuthClick(event) {
     // Sign user in after click on auth button.
     GoogleAuth.signIn();
   }

   function setSigninStatus() {
     var user = GoogleAuth.currentUser.get();
     isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
     // Toggle button text and displayed statement based on current auth status.
     if (isAuthorized) {
       defineRequest();
     }
   }

   function updateSigninStatus(isSignedIn) {
     setSigninStatus();
   }

   function createResource(properties) {
     var resource = {};
     var normalizedProps = properties;
     for (var p in properties) {
       var value = properties[p];
       if (p && p.substr(-2, 2) == '[]') {
         var adjustedName = p.replace('[]', '');
         if (value) {
           normalizedProps[adjustedName] = value.split(',');
         }
         delete normalizedProps[p];
       }
     }
     for (var p in normalizedProps) {
       // Leave properties that don't have values out of inserted resource.
       if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
         var propArray = p.split('.');
         var ref = resource;
         for (var pa = 0; pa < propArray.length; pa++) {
           var key = propArray[pa];
           if (pa == propArray.length - 1) {
             ref[key] = normalizedProps[p];
           } else {
             ref = ref[key] = ref[key] || {};
           }
         }
       };
     }
     return resource;
   }

   function removeEmptyParams(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
  }

  function executeRequest(request) {
    request.execute(function(response) {
      console.log(response);
      //response object gotten here
      yTresults.push(response);

    });
  }

  function buildApiRequest(requestMethod, path, params, properties) {
    params = removeEmptyParams(params);
    var request;
    if (properties) {
      var resource = createResource(properties);
      request = gapi.client.request({
          'body': resource,
          'method': requestMethod,
          'path': path,
          'params': params
      });
    } else {
      request = gapi.client.request({
          'method': requestMethod,
          'path': path,
          'params': params
      });
    }
    console.log(request);
    executeRequest(request);
  }

  /***** END BOILERPLATE CODE *****/

  
  function defineRequest() {
    // See full sample for buildApiRequest() code, which is not 
// specific to a particular API or API method.

buildApiRequest('GET',
                '/youtube/v3/search',
                {'maxResults': '5',
                 'part': 'snippet',
                 'q': artistQuery,
                 'type': 'video',
                 'videoCategoryId': '10',
                 'videoEmbeddable':'true',});
  }

  /** JEFF: END OF DO MAKE WORK GOOD GOOGLE CODE
  	  JEFF: I am *NOT* Responsable for this code**/
function getVideoIds(artistQuery){
// buildApiRequest('GET',
//                 '/youtube/v3/search',
//                 {'maxResults': '5',
//                  'part': 'snippet',
//                  'q': artistQuery,
//                  'type': 'video',
//                  'videoCategoryId': '10',
//                  'videoEmbeddable':'true',});
setTimeout(function(){buildApiRequest('GET',
                '/youtube/v3/search',
                {'maxResults': '5',
                 'part': 'snippet',
                 'q': artistQuery,
                 'type': 'video',
                 'videoCategoryId': '10',
                 'videoEmbeddable':'true',}
	)},2000);
}
getVideoIds('pearl jam');
getVideoIds("black sabbath");