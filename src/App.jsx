import "./App.css";
import Grid from "./Grid";
import { useState } from "react";

function App() {
  const [gen, setGen] = useState(0);
  const speed = 100;
  const rows = 30;
  const cols = 50;
  const [gridFull, setGridFull] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
  );

  const selectBox = (row, col) => {
    let newGrid = gridFull.map((arr) => [...arr]);
    newGrid[row][col] = !newGrid[row][col];
    setGridFull(newGrid);
  };

  return (
    <>
      <div className="md:max-w-[47rem]">
        <h1 className="font-bold">The Game of Life</h1>
        <Grid
          gridFull={gridFull}
          rows={rows}
          cols={cols}
          selectBox={selectBox}
        />
        <h2 className="font-semibold text-lg">Generations: {gen}</h2>
      </div>
    </>
  );
}

export default App;
