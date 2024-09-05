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
    let newGrid = gridFull.map((arr) => [...arr]); // Create a copy of the grid
    newGrid[row][col] = !newGrid[row][col]; // Toggle the selected box
    setGridFull(newGrid); // Update state with the new grid
  };

  return (
    <>
      <div className="max-w-3xl">
        <h1 className="font-bold">The Game of Life</h1>
        <Grid gridFull={gridFull} rows={rows} cols={cols} />
        <h2 className="font-semibold text-lg">Generations: {gen}</h2>
      </div>
    </>
  );
}

export default App;
