let buttonColors=["red", "blue", "green", "yellow"];
let gamePattern=[], userClickedPattern=[];
let level=0, index=0;

let playSound=(sound)=>{
    new Audio(`./sounds/${sound}.mp3`).play();
}

let animatePress=(color)=>{
    $(`#${color}`).fadeTo(100, 0.1, function() { $(this).fadeTo(100, 1.0); });
}

let nextSequence = ()=>{
    level=level+1;
    $('h1').html(`Level ${level}`);
    let randomNumber=Math.round(Math.random()*3)
    return(randomNumber)
}


let checkAnswer=()=>{
    console.log(gamePattern, userClickedPattern)
    if(gamePattern[index]===userClickedPattern[index] && level===index+1){
        setTimeout(levelUp, 1000);
    }
    else if(gamePattern[index]===userClickedPattern[index] && index+1 < level){
        index++;
        console.log(index)
    }
    else{
        playSound('wrong');
        $('h1').html(`Game Over, Press Any Key to Restart`);
        $('body').addClass('game-over')
        setTimeout(()=>$('body').removeClass('game-over'), 200);
        level=0;
        index=0;
        gamePattern=[];
        userClickedPattern=[];
    }
}

let levelUp=()=>{
    index=0;
    userClickedPattern=[];
    randomChosenColor=buttonColors[nextSequence()];
    console.log(randomChosenColor)
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);  
    playSound(randomChosenColor);
}

$('body').keypress(()=>{
    $('h1').html(`Level ${level}`);
    if(level===0){
    let randomChosenColor=buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);  
    playSound(randomChosenColor);
    }
})

$('.btn').on("click", (event)=>{
    let userChosenColor=event.target.id
    userClickedPattern.push(userChosenColor)
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer();
})

