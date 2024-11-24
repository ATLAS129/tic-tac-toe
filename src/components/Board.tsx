type Props = {
  board: string[][];
  handleChangeBoard: (i: number, index: number) => void;
};

export default function Board({ board, handleChangeBoard }: Props) {
  return (
    <div className="grid grid-rows-3 gap-1">
      {board.map((el, row) => (
        <div key={row} className="flex gap-1">
          {el.map((_, col) => (
            <div
              key={col}
              className="w-20 h-20 text-6xl font-semibold bg-slate-200 dark:bg-slate-700 text-center cursor-pointer"
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
