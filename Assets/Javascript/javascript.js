// Jessica's event listeners for the submit button

//NOTE: Dummy array name until I learn what Jeff is using
var arrayName = [];

    function registerUserInput() {
        //QUESTION: Is it best to create a new ID dynamically instead of using Boostrap class?
        $('.form-control').on('click', 'button.submit', function (event) { 
            // $('.form-control').empty();//empty values stored in div
            // event.preventDefault();//don't need event listener since we're changed form submit to button
            console.log("button clicked");
            var newArtist = $('.form-control').val().trim();
            //QUESTION: WILL BE PUSHING TO ARRAY?
            arrayName.push(newArtist);
            //need to add data attr 'search-name' either dynamically or in html
            var newArtist = $(this).data('search-name');
            console.log(arrayName);
            //QUESTION: Query show be in onclick event, so Youtube vid will display when button.submit clicked?

        });
    }
        //example Ajax Query below:

        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + directorName + "&" + "api_key=K7VHz9NppDBHaxASoEIbI1cTsz62R7vB&limit=10";
        // //console logged results. After clicking Ava DuVernay button, we see the url for her in the console.
        // console.log(queryURL);

        // //AJAX Request / calls the query function
        // $.ajax({ url: queryURL, method: 'GET' })

        //     .done(function (response) {
        //         console.log(response);
        //         $('#gifBucket').empty();
        //         //print results to page
        //         for (var i = 0; i < response.data.length; i++) {
        //             //create new div & class to store in variable
        //             var gifDiv = $('<div>');
        //             gifDiv.addClass('gifPDiv');
        //             //new var to store new p tag. Using .text to write "Rating" & rating from AJAX results
        //             var pRating = $('<p>').text("Rating: " + response.data[i].rating);

        //             var gifImg = $('<img>');
        //             //img src attribute
        //             gifImg.attr('src', response.data[i].images.fixed_height_small_still.url);
        //             //still img
        //             //add class to gifImage var
        //             gifImg.addClass('image');

        //             // prepend and append ratings and gifs to gifDiv variable
        //             gifDiv.prepend(pRating);
        //             gifDiv.append(gifImg);

        //             //Use jQuery to append gifDiv under Div ID in DOM
        //             $('#gifBucket').append(gifDiv);
        //             //review prevent Default
        //             event.preventDefault();
        
        //         }
        //     })
    
   
