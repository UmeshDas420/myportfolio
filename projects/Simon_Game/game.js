var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPatterns = [];
var level = 0;
var started = false;
//To call an random sequence of color.
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   level++;
   $("#level-title").text("Level " + level);
}
// To play the sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}
// TO animate the key press of the user
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
// To check whether the user answer was right or wrong.
function checkAnswer(currentLevel){
    //If the users answer is correct.
    if (gamePattern[currentLevel] === userClickedPatterns[currentLevel]){
        console.log(gamePattern[currentLevel]);
        // Tf the sequnce is correct.
        if (gamePattern.length===userClickedPatterns.length){
            console.log(gamePattern[currentLevel]);
            setTimeout(function(){
                nextSequence();
                userClickedPatterns = [];
            },1000);
        }
    // If user give wrong Answer.
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout( function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).keydown(function(){
            startOver();
        });
    }
    
}
// To start over the game from 0.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
// TO detect the users click.
$(".btn").click(function(){
    var userClickedColor = $(this).attr("id");
    userClickedPatterns.push(userClickedColor);
    animatePress(userClickedColor);
    playSound(userClickedColor);
    
    checkAnswer(userClickedPatterns.length-1);
});
// To start the game on Keypress.
$(document).keydown(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });