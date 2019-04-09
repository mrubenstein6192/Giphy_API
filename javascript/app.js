var animals = ["Axolotl", "Bird", "Cat", "Dog", "Elephant", "Fish", "Giraffe", "Horse", "Iguana", "Jaguar", "Kangaroo", "Lion", "Mouse", "Numbat", "Otter", "Pig", "Quail", "Red Panda", "Snake", "Tiger", "Umbrellabird", "Vulture", "Whale", "Yak", "Zebra"];
 // Function for displaying animals data
 function renderButtons() {

  // Deleting the buttons prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamically generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal to our button
    a.addClass("animal");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding the animal from the textbox to our array
  animals.push(animal);
  console.log(animals);

  // Calling renderButtons which handles the processing of our animals array
  renderButtons();
  $("#animal-input").val("");
});

// Function for displaying the animal info
// Using $(document).on instead of $(".animal").on to add event listeners to dynamically generated elements
$(document).on("click", ".animal", displayAnimalsInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();

function displayAnimalsInfo() {

  var animal = $(this).attr("data-name");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=y01f8RntN1lrAS5wYBlQhpevmuuc1uzJ&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    console.log(response);
    
    var results = response.data;
    
    for (var i = 0; i < results.length; i++){
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      gifDiv.append(p);
      gifDiv.append(animalImage);
      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
}