//Logic
//we will store the score in local storage so create a var score and get initial values of wins loses and ties  
//which are either 0 at the beginning of game or fetched from localstorage if they exist
//1.using random oick computer move
//2.listen for player move through keyboard(optional)
//3.make a function to display the scores on screen
//4.compare player move and computer move (Actual game logic) and set score to local storage and update the score on display
//5.create a autoplay function


const score = JSON.parse(localStorage.getItem('score')) || {wins : 0, loses : 0 , tie : 0}; 
//json.parse coz we need to convert the json to object to display

updateScoreElement();
//to display initial scores

//1.
function pickComputerMove()
        {
            const randomNumber = Math.random();
            let computerMove = '';

            if(randomNumber > 0 && randomNumber < 1/3){
                computerMove = 'Rock';
            }
            else if(randomNumber >1/3  && randomNumber < 2/3){
                computerMove = 'Paper';
            }
            else if(randomNumber >2/3  && randomNumber < 1){
                computerMove = 'Scissors';
            }
            return computerMove;
        };
        
//2
document.body.addEventListener('keydown' , (event) => {
    if(event.key === 'r')
    {
        playGame('Rock');
    }
    else if(event.key === 'p')
    {
        playGame('Paper');
    }
    else if(event.key === 's')
    {
        playGame('Scissors');
    }

})

//3
function updateScoreElement()
        {
            document.querySelector('.js-score').innerHTML = `wins : ${score.wins} loses : ${score.loses} ties : ${score.tie}`
        }


//4
function playGame(playerMove){

    let result = '';
    const computerMove = pickComputerMove();
    

    //comparing moves
    if(playerMove === 'Scissors')
    {

        if(computerMove === 'Rock'){
            result = 'You Lose';
        }
        else if (computerMove === 'Paper'){
            result = 'You Win';
        }
        else if (computerMove === 'Scissors'){
            result = 'Tie';  
        } 
    }

    else if(playerMove === 'Rock')
    {
        
        if(computerMove === 'Rock'){
            result = 'Tie';
        }
        else if (computerMove === 'Paper'){
            result = 'You Lose';
        }
        else if (computerMove === 'Scissors'){
            result = 'You Win';
        }
    }

    else if(playerMove === 'Paper')
    {
        
        if(computerMove === 'Rock'){
            result = 'You Win';
        }
        else if (computerMove === 'Paper'){
            result = 'Tie';
        }
        else if (computerMove === 'Scissors'){
            result = 'You Lose';  
        } 
    }

    //adding score
    if(result === 'You Win')
    {
        score.wins += 1;
    }
    else if(result === 'You Lose')
    {
        score.loses += 1;
    }
    else if(result === 'Tie')
    {
        score.tie += 1;
    }

    localStorage.setItem('score' , JSON.stringify(score));

    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon">  <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;


}

//6/
    let isAutoPlaying = false;
    let intervalId;

        function autoPlay() {
            if (!isAutoPlaying){
                intervalId = setInterval( () => {
                    const playerMove = pickComputerMove();
                    playGame(playerMove);
                }, 1000);
                isAutoPlaying = true;
                document.querySelector('.auto-play-button').innerText = 'stop';
            }
            else{
                clearInterval(intervalId);
                isAutoPlaying = false;
                document.querySelector('.auto-play-button').innerText = 'Auto Play';

            }
        };



   
        
    

     
        
        

       