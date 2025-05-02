

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare,turns}) {

    // const [gameboard,setGameBoard] = useState(initialGameBoard);
   

    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }


    let gameboard = initialGameBoard;
    for(const turn of turns){
        const {square,player} = turn;
        const {row,col} = square;
        gameboard[row][col] = player;
    }

  return (
    <ol id="game-board">
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
