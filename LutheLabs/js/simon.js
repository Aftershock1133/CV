var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 0;
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level)
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeTo(150,0.1).fadeTo(150,1);
    playSound(randomChosenColour)
}
$(".gameBtn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
        sound.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}
$(document).on("keydown", function(){
    if (gameStarted === false){
        nextSequence();
        gameStarted = true;
        console.log("gameStarted "+gameStarted);
    }
});
function checkAnswer(currentLevel){
    console.log("User: "+userClickedPattern);
    console.log("Game: "+gamePattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("right");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 200);
        $("#level-title").text("GAME OVER")
        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
