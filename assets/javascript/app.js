/* HW6 GifTastic using GIPHY */

/* Initial array of instrument */
var topics = ["cat", "dog", "duck", "bear"];
var duplicated = false;

function displayTopicGif() {
  var topic = $(this).attr("data_name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +
    "&api_key=OtbL1Pe9u0c6EHgsgdWVTiw1LwlEPMW1&limit=10&rating=g";
  /* AJAX */
  /* creating AJAX call for GETting url of GIFs from GIPHY */
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) { /* process after getting result from AJAX request */
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div class='topic'>");
      var rate = results[i].rating;
      var line1 = $("<p>").text("Rate: " + rate.toUpperCase());
      topicDiv.append(line1);

      var imageURLstill = results[i].images.fixed_height_still.url; /* still GIF */
      var imageURLanimate = results[i].images.fixed_height.url; /* animated GIF */
      var a = $("<img>"); /* creating img tag */
      a.addClass("gif"); /* add class */
      /* add attributes for <img> which will be used for toggling still and animated gifs */
      a.attr("src", imageURLstill);
      a.attr("data_state", "still");
      a.attr("data_still", imageURLstill);
      a.attr("data_animate", imageURLanimate);

      topicDiv.append(a);
      $("#topic_view").prepend(topicDiv);
    }
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
    var a = $("<button>"); /* creating <button> tag */
    a.addClass("topic_btn"); /* add class */
    /* add attributes for <button> which will be used for distinguishing data's name within */
    a.attr("data_name", topics[i]);
    a.text(topics[i]); /* labeling name of data on the buton */
    $("#buttons_view").append(a); /* append the button without overlapping */
  }
}
function toggleStillAnimate() {
  var state = $(this).attr("data_state"); /* getting current state */
  if (state === "still") { /* if still gif is clicked */
    $(this).attr("src", $(this).attr("data_animate")); /* update gif's src attribute to animate gif url */
    $(this).attr("data_state", "animate"); /* update gif's data-state to animate */
  } else { /* if animate gif is clicked */
    $(this).attr("src", $(this).attr("data_still")); /* update gif's src attribute to still gif url */
    $(this).attr("data_state", "still"); /* update gif's data-state to still */
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
/* click event listener for displaying designated gifs */
$(document).on("click", ".topic_btn", displayTopicGif);

displayButtons(); /* display intial buttons */

/* click event listener for toggling still and animate gifs*/
$(document).on("click", ".gif", toggleStillAnimate); 