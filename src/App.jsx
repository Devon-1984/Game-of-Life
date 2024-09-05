import "./App.css";
import Grid from "./Grid";
import Buttons from "./Buttons";
import { useState, useCallback, useRef } from "react";

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

  const intervalRef = useRef(null);

  const selectBox = (row, col) => {
    let newGrid = gridFull.map((arr) => [...arr]);
    newGrid[row][col] = !newGrid[row][col];
    setGridFull(newGrid);
  };

  let seed = () => {
    let newGrid = gridFull.map((arr) => [...arr]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          newGrid[i][j] = true;
        }
      }
    }
    setGridFull(newGrid);
  };

  const arrayClone = (arr) => JSON.parse(JSON.stringify(arr));

  const play = useCallback(() => {
    let g = gridFull;
    let g2 = arrayClone(gridFull);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 0;
        if (i > 0 && g[i - 1][j]) count++;
        if (i > 0 && j > 0 && g[i - 1][j - 1]) count++;
        if (i > 0 && j < cols - 1 && g[i - 1][j + 1]) count++;
        if (j < cols - 1 && g[i][j + 1]) count++;
        if (j > 0 && g[i][j - 1]) count++;
        if (i < rows - 1 && g[i + 1][j]) count++;
        if (i < rows - 1 && j > 0 && g[i + 1][j - 1]) count++;
        if (i < rows - 1 && j < cols - 1 && g[i + 1][j + 1]) count++;

        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    setGridFull(g2);
    setGen((prevGen) => prevGen + 1);
  }, [gridFull]);

  const startSimulation = () => {
    if (!intervalRef.current) {
      // Prevent multiple intervals
      intervalRef.current = setInterval(play, speed);
    }
  };

  const stopSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset the ref to indicate no active interval
    }
  };

  return (
    <>
      <div className="md:max-w-[47rem] flex flex-col items-center">
        <h1 className="font-bold">The Game of Life</h1>
        <Buttons
          seed={seed}
          startSimulation={startSimulation}
          stopSimulation={stopSimulation}
        />

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
