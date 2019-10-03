/* HW6 GifTastic using GIPHY */
/* Initial array of instrument */
var topics = ["cat", "dog", "duck", "bear"];
var duplicated = false;
function displayTopicGif() {
  var topic = $(this).attr("data_name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=OtbL1Pe9u0c6EHgsgdWVTiw1LwlEPMW1&tag=" + topic + "&rating=g&limit=10";
  /* AJAX */
  /* creating AJAX call for GETting url of GIFs from GIPHY */
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) { /* process after getting result from AJAX request */

    

    var topicDiv = $("<div class='topic'>");
    var rate = response.rating;
    var line1 = $("<p>").text("Rate: " + rate);
    topicDiv.append(line1);
    var imageURL = response.data.image_original_url;
    var image = $("<img>").attr("src", imageURL);
    topicDiv.append(image);
    $("#topic_view").prepend(topicDiv);


    //   /* save image_original_url property */
    //   var imageUrl = response.data.image_original_url;

    //   /* create img tag for new GIFs */
    //   var topicImage = $("<img>");

    //   /* set up scr and alt attributes */
    //   topicImage.attr("src", imageUrl);
    //   topicImage.attr("alt", "Image not available for now");

    //   /* prepending searched GIFs to image display area */
    //   $("#topic_view").prepend(topicImage);
  });
}
function checkDuplicate(inTopic) { /* check if input is duplicated */
  duplicated = false;
  var done = 0;
  for (var i = 0; i < topics.length; i++) {
    if (topics[i] === inTopic && duplicated === false) {
      document.getElementById("topic_input").value = "";
      return true;
      done = 1;
    }
  }
  if (done === 0) return false;
}
function displayButtons() { /* initial buttons */
  $("#buttons_view").empty();
  document.getElementById("topic_input").value = "";
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("topic_btn");
    a.attr("data_name", topics[i]);
    a.text(topics[i]);
    $("#buttons_view").append(a);
  }
}
$("#add_topic").on("click", function (event) { /* event for add animal button clicked */
  event.preventDefault();
  var topic = $("#topic_input").val().trim(); /* get entered animal name from textbox */
  if (topic !== "") { /* add new button only if there is a input string */
    duplicated = checkDuplicate(topic);
    if (duplicated === false) {
      topics.push(topic); /* adding newly entered animal name to animal array */
      displayButtons(); /* display currently updated buttons */
    }
  }
});

/* add click event listener */
$(document).on("click", ".topic_btn", displayTopicGif);

displayButtons(); /* display intial buttons */
