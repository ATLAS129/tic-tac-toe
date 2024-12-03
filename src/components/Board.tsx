type Props = {
  board: string[][];
  handleChangeBoard: (i: number, index: number) => void;
  winningPositions?: number[][] | null;
};

export default function Board({
  board,
  handleChangeBoard,
  winningPositions,
}: Props) {
  console.log(winningPositions);

  return (
    <div className="grid grid-rows-3 gap-1">
      {board.map((el, row) => (
        <div key={row} className="flex gap-1">
          {el.map((_, col) => (
            <div
              key={col}
              className={`w-20 h-20 text-6xl font-semibold text-center cursor-pointer ${
                winningPositions
                  ? winningPositions.some((el) => el[0] == row && el[1] == col)
                    ? "bg-green-500 dark:bg-green-950 transition"
                    : "bg-slate-200 dark:bg-slate-700"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => handleChangeBoard(row, col)}
            >
              {el[col]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
