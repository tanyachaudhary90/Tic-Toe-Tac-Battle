let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = "O";
let count = 0;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

boxes.forEach((box)=>{
  box.addEventListener("click",()=>{

    if(currentPlayer === "O"){
      box.innerText = "O";
      currentPlayer = "X";
    }else{
      box.innerText = "X";
      currentPlayer = "O";
    }

    box.disabled = true;
    count++;

    let winner = checkWinner();

    if(winner){
      showWinner(winner);
      return;
    }

    if(count === 9){
      drawGame();
    }

  });
});


const checkWinner = ()=>{

  for(let pattern of winPatterns){

    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;


    if(pos1 !== "" && pos2 !== "" && pos3 !== ""){

      if(pos1 === pos2 && pos2 === pos3){
        return pos1;
      }

    }

  }

  return null;
};


const showWinner = (winner)=>{

  msg.innerText = `🎉 Player ${winner} Wins! 🏆`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  confetti({
    particleCount:150,
    spread:100
  });

};


const drawGame = ()=>{
  msg.innerText = "Game was a Draw";
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const disableBoxes = ()=>{
  for(let box of boxes){
    box.disabled = true;
  }
};


const enableBoxes = ()=>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
};


const resetGame = ()=>{
  currentPlayer = "O";
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};


newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);