import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "../winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActiveplayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0  && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}


function App() {
  
 
 const[gameTurns,setGameTurns]=useState([]);
 //const[hasWinner,setHasWinner]=useState(false);

 const activePlayer = derivedActiveplayer(gameTurns);


 let gameboard = [...initialGameBoard.map(array => [...array])];
 for(const turn of gameTurns){
     const {square,player} = turn;
     const {row,col} = square;
     gameboard[row][col] = player;
 }
 
 let winner = null;

 for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];
    console.log(`Checking combination: ${combination.map(c => `(${c.row},${c.col})`).join(', ')} - Symbols: ${firstSquareSymbol}, ${secondSquareSymbol}, ${thirdSquareSymbol}`);
    if(firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol && 
       firstSquareSymbol ===  thirdSquareSymbol){
        console.log("Somebody won");
        winner = firstSquareSymbol;
        break;
    }

 }

 function handleSelectSquare(rowIndex,colIndex){
    //  setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
      setGameTurns((prevTurns) => {
      let currentPlayer =  derivedActiveplayer(prevTurns);
        const updatedTurns = [ {square :{row:rowIndex,col:colIndex},player : currentPlayer}, ...prevTurns,];
          console.log(updatedTurns);
        return updatedTurns;
      });
  }


  return (
    <main>
      <div id = "game-container">
        <ol id= "players" className="highlight-player">
          <Player initialName = "Player 1" symbol = "X" isActive={activePlayer === 'X'}/>
          <Player  initialName = "Player 2" symbol = "O" isActive={activePlayer === 'O'}/>
        </ol>
        {winner && <p>You Won , {winner}!</p> }
       <GameBoard onSelectSquare={handleSelectSquare} board = {gameboard}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
