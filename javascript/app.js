var animals = ["Bird", "Cat", "Dog", "Fish", "Otter", "Pig", "Snake", "Whale"];
var sports = ["Baseball", "Basketball", "Football", "Hockey", "Soccer"];
var superheroes = ["Batman", "Black Widow", "Captain America", "Iron Man", "Spiderman", "Superman", "Wolverine", "Wonder Woman"]

function buttonsOptions() {
  var animalButton = $("<button>");
  animalButton.addClass("buttonOption");
  animalButton.text("Animals");
  animalButton.attr("data-name", "animals")
  $("#button-options").append(animalButton)

  var sportsButton = $("<button>");
  sportsButton.addClass("buttonOption");
  sportsButton.text("Sports");
  sportsButton.attr("data-name", "sports")
  $("#button-options").append(sportsButton)

  var heroesButton = $("<button>");
  heroesButton.addClass("buttonOption");
  heroesButton.text("Heroes");
  heroesButton.attr("data-name", "heroes")
  $("#button-options").append(heroesButton)
}

$(document).on("click", ".buttonOption", function() {
  if ($(this).attr("data-name") === "animals") {
    renderButtonsAnimals();
  }
  else if ($(this).attr("data-name") === "sports") {
    renderButtonsSports()
  }
  else if ($(this).attr("data-name") === "heroes") {
    renderButtonsHeroes()
  }
})



 // Function for displaying animals data
 function renderButtonsAnimals() {
  $("h1").text("Animal GIFs")
  // Deleting the buttons prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamically generating buttons for each animal in the array
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

function renderButtonsSports(){
  $("#buttons-view").empty();
  $("h1").text("Sports GIFs")
  for (var i = 0; i < sports.length; i++) {

    // Then dynamically generating buttons for each animal in the array
    var a = $("<button>");
    // Adding a class of animal to our button
    a.addClass("animal");
    // Adding a data-attribute
    a.attr("data-name", sports[i]);
    // Providing the initial button text
    a.text(sports[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}
function renderButtonsHeroes() {
  $("#buttons-view").empty();
  $("h1").text("Superhero GIFs")
  for (var i = 0; i < superheroes.length; i++) {

    // Then dynamically generating buttons for each animal in the array
    var a = $("<button>");
    // Adding a class of animal to our button
    a.addClass("animal");
    // Adding a data-attribute
    a.attr("data-name", superheroes[i]);
    // Providing the initial button text
    a.text(superheroes[i]);
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
  renderButtonsAnimals();
  $("#animal-input").val("");
});

// Function for displaying the animal info
// Using $(document).on instead of $(".animal").on to add event listeners to dynamically generated elements
$(document).on("click", ".animal", displayAnimalsInfo);
// Calling the renderButtons function to display the initial buttons
buttonsOptions();
// renderButtonsAnimals();

function displayAnimalsInfo() {

  var animal = $(this).attr("data-name");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=y01f8RntN1lrAS5wYBlQhpevmuuc1uzJ&limit=9";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    console.log(response);
    
    var results = response.data;
    
    for (var i = 0; i < results.length; i++){
      var gifDiv = $("<div>");
      gifDiv.css("display", "inline-block");
      
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      
      var animalImage = $("<img>");
      
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      
      
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      
      animalImage.addClass("gif");
      
      animalImage.css("width", "200px").css("height", "200px")

      gifDiv.append(animalImage);
      gifDiv.append(p);

     

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
}

$(document).on("click", ".gif", function() {
  
  if($(this).attr("data-animate") === $(this).attr("src")) {
  $(this).attr("src", $(this).attr("data-still"));
} 
else {
  $(this).attr("src", $(this).attr("data-animate"));
}
});