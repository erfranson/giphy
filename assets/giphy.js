$("body").on("click", ".gif", function() {
      $("#gifs-appear-here").empty();
      var movie = $(this).attr("data-movie");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still",  results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            console.log(personImage);
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });

$("#movie").on("click",function(){
    var newMovie = $('#new-movie').val().trim();
    event.preventDefault();
    $('#buttons').append('<button data-movie="'+ newMovie + '"class="btn btn-primary gif">'+ newMovie + '</button>');

});

$('body').on('click', "img", function(){
  var img = $(this);
  var state = img.attr("data-state");
  var still = img.attr("data-still");
  var animate = img.attr("data-animate");

  if (state === "still") {
    img.attr("src", animate);
    img.attr("data-state", "animate");
  } else {
    img.attr("src", still);
    img.attr("data-state", "still");
  }
});