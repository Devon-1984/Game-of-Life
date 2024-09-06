import React, { useState, useCallback, useRef } from "react";
import Grid from "./Grid";
import Buttons from "./Buttons";
import framesData from "./frames_data.json"; // Import your frames data JSON

function App() {
  const [gen, setGen] = useState(0); // Generation count for Game of Life
  const speed = 33;
  const rows = 30;
  const cols = 50;
  const [gridFull, setGridFull] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
  );

  const [showBadApple, setShowBadApple] = useState(false);
  const [animationFrameIndex, setAnimationFrameIndex] = useState(0);
  const intervalRef = useRef(null);

  const selectBox = (row, col) => {
    let newGrid = gridFull.map((arr) => [...arr]);
    newGrid[row][col] = !newGrid[row][col];
    setGridFull(newGrid);
  };

  const seed = () => {
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
    setGridFull((prevGrid) => {
      const newGrid = arrayClone(prevGrid);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let count = 0;
          if (i > 0 && prevGrid[i - 1][j]) count++;
          if (i > 0 && j > 0 && prevGrid[i - 1][j - 1]) count++;
          if (i > 0 && j < cols - 1 && prevGrid[i - 1][j + 1]) count++;
          if (j < cols - 1 && prevGrid[i][j + 1]) count++;
          if (j > 0 && prevGrid[i][j - 1]) count++;
          if (i < rows - 1 && prevGrid[i + 1][j]) count++;
          if (i < rows - 1 && j > 0 && prevGrid[i + 1][j - 1]) count++;
          if (i < rows - 1 && j < cols - 1 && prevGrid[i + 1][j + 1]) count++;

          if (prevGrid[i][j] && (count < 2 || count > 3)) newGrid[i][j] = false;
          if (!prevGrid[i][j] && count === 3) newGrid[i][j] = true;
        }
      }
      return newGrid;
    });
    setGen((prevGen) => prevGen + 1);
  }, [rows, cols]);

  const startSimulation = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (showBadApple) {
          setAnimationFrameIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % framesData.length;
            return nextIndex;
          });
        } else {
          play();
        }
      }, speed);
    }
  };

  const stopSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleBadApple = () => {
    setShowBadApple((prev) => !prev);
  };

  return (
    <>
      <div className="max-w-[47rem] flex flex-col items-center">
        <h1 className="font-bold">
          {showBadApple ? "Bad Apple Animation" : "The Game of Life"}
        </h1>
        <Buttons
          seed={seed}
          startSimulation={startSimulation}
          stopSimulation={stopSimulation}
          toggleBadApple={toggleBadApple}
        />
        <Grid
          gridFull={gridFull}
          rows={rows}
          cols={cols}
          selectBox={selectBox}
          animationData={framesData}
          animationFrameIndex={animationFrameIndex}
          type={showBadApple ? "animation" : "game"}
        />
        <h2 className="font-semibold text-lg">
          {showBadApple
            ? `Frame: ${animationFrameIndex + 1}`
            : `Generations: ${gen}`}
        </h2>
      </div>
    </>
  );
}

export default App;
