var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
}

//Detect Button click
$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  makeSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Detect key press

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }

})

//Animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

// playing sound
function makeSound(buttonColor) {
  var audio = new Audio("sounds/" + buttonColor + ".mp3");
  audio.play();
}

//checking answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
