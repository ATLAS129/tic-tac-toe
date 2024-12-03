import { useState } from "react";
import Board from "./components/Board";
import { ThemeProvider } from "./components/ThemeProvider";
import ToggleButton from "./components/ToggleButton";

type Winner =
  | { winner: "X" | "O" | "Draw" | ""; position?: number[][] | null }
  | "";

export default function App() {
  const [isX, setIsX] = useState<boolean>(true);
  const [board, setBoard] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [winner, setWinner] = useState<Winner>();

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
    const boardPatterns: number[][][] = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      if (winningPatterns[i].every((cell) => cell === "x")) {
        setWinner({ winner: "X", position: boardPatterns[i] });
        return;
      }
      if (winningPatterns[i].every((cell) => cell === "o")) {
        setWinner({ winner: "X", position: boardPatterns[i] });
        return;
      }
    }

    if (updatedBoard.every((row) => row.every((cell) => cell !== ""))) {
      setWinner({ winner: "Draw" });
    }
  };

  return (
    <div className="transition w-full h-screen flex flex-col justify-between items-center bg-white dark:bg-[#333] dark:text-slate-400">
      <div className="w-full flex p-3">
        <h1 className="text-center text-3xl flex-1 sm:text-5xl font-semibold">
          Tic-Tac-Toe⭕❌
        </h1>
        <ThemeProvider>
          <div>
            <ToggleButton />
          </div>
        </ThemeProvider>
      </div>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl">
          {winner ? (winner.winner !== "Draw" ? "Winner is " : "") : "Next is "}
          <span className="text-4xl">
            {winner ? winner.winner : isX ? "X" : "O"}
          </span>
        </h1>
        <Board
          board={board}
          handleChangeBoard={handleChangeBoard}
          winningPositions={
            winner ? (winner?.position ? winner?.position : null) : null
          }
        />
        <button
          className="py-1 px-4 bg-slate-200 dark:bg-slate-700 rounded-md"
          onClick={handleResetBoard}
        >
          Reset
        </button>
      </div>
      <h1 className="text-3xl p-2">Thx for checking out💖</h1>
    </div>
  );
}
