function Game()
{
    this.score=0;
    this.scoreElement=document.getElementById("score");
    this.resultScreen=new ResultScreen();
    this.pickMenu=new PickMenu(this.resultScreen);
    this.rulesElement=document.getElementById("rulesBackground");
    this.openRulesButton=document.getElementById("rulesButton");
    this.closeRulesButton=document.getElementById("closeButton");

    this.closeRulesButton.addEventListener("click",function(){game.displayRules(false);});
    this.openRulesButton.addEventListener("click",function(){game.displayRules(true);});


    this.gameStart=function(){

        this.resultScreen.reset();
        this.pickMenu.display();
        
        

    };

    this.changeScore=function(win){
        if(win){this.score++;}
        
            this.scoreElement.innerHTML=this.score;
        
    };

    this.displayRules=function(open){

        if(open)
        {
            this.rulesElement.style.display="flex";

        }
        else
        {
            this.rulesElement.style.display="none";

        }

    }

    

}

function PickMenu(resultScreen)
{
    this.resultScreen=resultScreen;
    this.result;
    this.menu=document.getElementById("chooseAction");
    this.pickOption=this.menu.querySelectorAll(".actionIcon");
    this.pickOption[0].addEventListener("click",function(){game.pickMenu.pick("paper");});
    this.pickOption[1].addEventListener("click",function(){game.pickMenu.pick("scissors");});
    this.pickOption[2].addEventListener("click",function(){game.pickMenu.pick("rock");});

    this.display=function(){

        this.menu.style.display="flex";

    }

    this.pick=function(value){
        this.menu.style.display="none";
        this.result=value;
        this.resultScreen.setResult(this.result);


    }




}

function ResultScreen()
{
    this.resultScreen=document.getElementById("gameResult");
    this.playerPickElement=document.querySelector("#playerPick .actionIcon");
    this.player2PickElement=document.querySelector("#ordiPick .actionIcon");
    this.restartButton=document.querySelector("#result");
    this.restartButton.querySelector("#playAgain").addEventListener("click",function(){game.gameStart();});
    this.player1Result;
    this.player2Result;

    this.setResult=function(value){

        this.player1Result=value;
        this.display();

    };

    this.display=function(){

        this.resultScreen.style.display="flex";
        this.playerPickElement.className=this.player1Result+" actionIcon";
        this.player2PickElement.className="actionIcon";
        this.setPlayer2Result();

    };

    this.setPlayer2Result=function(){
        let pick=Math.floor(Math.random()*3);

        switch(pick)
        {
            case 0:
                this.player2Result="paper";
            break;

            case 1:
                this.player2Result="scissors";
            break;

            case 2:
                this.player2Result="rock";
            break;
        }

        this.player2PickElement.className=this.player2Result+" actionIcon";
        this.setWinner();

    };

    this.setWinner=function(){

        let win;
        let message;

        switch(this.player1Result)
        {
            case "paper":
            {
                switch(this.player2Result)
                {
                    case "paper":
                    {
                        win=false;
                        message="TIE";

                    }
                    break;

                    case "scissors":
                    {
                        win=false;
                        message="YOU LOSE";

                    }
                    break;

                    case "rock":
                    {
                        win=true;
                        message="YOU WIN";

                    }
                    break;

                }

            }
            break;

            case "scissors":
            {
                switch(this.player2Result)
                {
                    case "paper":
                    {
                        win=true;
                        message="YOU WIN";

                    }
                    break;

                    case "scissors":
                    {
                        win=false;
                        message="TIE";

                    }
                    break;

                    case "rock":
                    {
                        win=false;
                        message="YOU LOSE";

                    }
                    break;

                }

            }
            break;

            case "rock":
            {
                switch(this.player2Result)
                {
                    case "paper":
                    {
                        win=false;
                        message="YOU LOSE";

                    }
                    break;

                    case "scissors":
                    {
                        win=true;
                        message="YOU WIN";

                    }
                    break;

                    case "rock":
                    {
                        win=false;
                        message="TIE";

                    }
                    break;

                }

            }
            break;
        
        }

        game.changeScore(win);
        this.restartButton.querySelector("h2").innerHTML=message;


    };

    this.reset=function(){
        this.resultScreen.style.display="none";

    };

}

let game=new Game();
game.gameStart();


