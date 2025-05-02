import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import Gameover from "./components/GameOver";


const PLAYERS = {
  X: "player1",
  O: "player2",
};


const INITIAL_GAME_BOARD = [
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


function deriveWinner(gameboard,players){
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
         winner = players[firstSquareSymbol];
         break;
     }
 
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameboard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;
      gameboard[row][col] = player;
  }
  return gameboard;
}


function App() {
  
 const[players,setPlayers] = useState(PLAYERS);

 function handlePlayernameChange(symbol,newName){
  setPlayers(prevPlayer=> {
    return {...prevPlayer,[symbol]:newName} 
  });
 }
 const[gameTurns,setGameTurns]=useState([]);
 

 const activePlayer = derivedActiveplayer(gameTurns);

const gameboard = deriveGameBoard(gameTurns);

 
const winner = deriveWinner(gameboard,players);

const hasDraw = gameTurns.length
 === 9 && winner === null;

 function handleRestart(){
    setGameTurns([]);

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
          <Player initialName = {PLAYERS.X} symbol = "X" isActive={activePlayer === 'X'}  onChangeName={handlePlayernameChange} />
          <Player  initialName = {PLAYERS.O} symbol = "O" isActive={activePlayer === 'O'} onChangeName={handlePlayernameChange}  />
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} onRestart={handleRestart}/> }
       <GameBoard onSelectSquare={handleSelectSquare} board = {gameboard}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
