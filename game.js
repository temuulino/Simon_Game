var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
// Creates random sequence
function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  //return randomNumber;
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  return randomChosenColour;
}

// Starting The Game
$(document).keydown(function(event){

	if(event.keyCode == '13'){
    setTimeout(function(){
      nextSequence();
      level = level + 1;
      $("#level-title").text("Level: " + level);
      userClickedPattern.length = 0;
    }, 1000);


  }
});

// When the user clicks it animates and brings up sound
$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour)
  var index = userClickedPattern.indexOf(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(index);
});

// Sound function
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate Function
function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");

  setTimeout(function(){
    $("." + currentColour).removeClass("pressed");
  }, 100);
}



// Pushes to the game pattern

//var lastColour = gamePattern[gamePattern.length - 1];
//alert(lastColour);



function checkAnswer(currentLevel){
  var lastColour = gamePattern[gamePattern.length - 1];
  //alert(lastColour);
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("correct");
  } else {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Enter to try again.")
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      startOver();
    }, 200);
    console.log("incorrect");
  }

}

function startOver(){
  level = 0;
  gamePattern.length = 0;
}
