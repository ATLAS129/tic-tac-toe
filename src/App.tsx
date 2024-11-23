import { useState } from "react";
import Board from "./components/Board";

export default function App() {
  const [isX, setIsX] = useState<boolean>(true);
  const [board, setBoard] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [winner, setWinner] = useState<string>();

  const handleChangeBoard = (i: number, index: number): void => {
    if (board[i][index] !== "" || winner) {
      return;
    }

    const updatedBoard: string[][] = board.map((row, rowIndex) =>
      rowIndex === i
        ? row.map((col, colIndex) =>
            colIndex === index ? (isX ? "x" : "o") : col
          )
        : row
    );

    setBoard(updatedBoard);
    checkWinner(updatedBoard);
    setIsX(!isX);
  };

  const handleResetBoard = (): void => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setIsX(true);
    setWinner("");
  };

  const checkWinner = (updatedBoard: string[][]): void => {
    const winningPatterns: string[][] = [
      [updatedBoard[0][0], updatedBoard[0][1], updatedBoard[0][2]],
      [updatedBoard[1][0], updatedBoard[1][1], updatedBoard[1][2]],
      [updatedBoard[2][0], updatedBoard[2][1], updatedBoard[2][2]],
      [updatedBoard[0][0], updatedBoard[1][0], updatedBoard[2][0]],
      [updatedBoard[0][1], updatedBoard[1][1], updatedBoard[2][1]],
      [updatedBoard[0][2], updatedBoard[1][2], updatedBoard[2][2]],
      [updatedBoard[0][0], updatedBoard[1][1], updatedBoard[2][2]],
      [updatedBoard[0][2], updatedBoard[1][1], updatedBoard[2][0]],
    ];

    for (let pattern of winningPatterns) {
      if (pattern.every((cell) => cell === "x")) {
        setWinner("X");
        return;
      }
      if (pattern.every((cell) => cell === "o")) {
        setWinner("O");
        return;
      }
    }

    if (updatedBoard.every((row) => row.every((cell) => cell !== ""))) {
      setWinner("Draw");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center">
      <h1 className="text-center text-5xl font-semibold p-2">Tic-Tac-Toe</h1>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
        {winner && (
          <h1 className="text-3xl">
            {winner !== "Draw" ? "Winner is " : ""}
            <span className="text-4xl">{winner}</span>
          </h1>
        )}
        <Board board={board} handleChangeBoard={handleChangeBoard} />
        <button
          className="py-1 px-4 bg-slate-200 rounded-md"
          onClick={handleResetBoard}
        >
          Reset
        </button>
      </div>
      <h1 className="text-3xl p-2">Thx for checking out💖</h1>
    </div>
  );
}
