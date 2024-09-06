import React from "react";
import Box from "./Box";

export default function Grid({
  gridFull,
  rows,
  cols,
  selectBox,
  animationData,
  animationFrameIndex,
  type,
}) {
  const width = cols * 16;
  let rowsArr = [];

  if (type === "animation") {
    const currentFrame = animationData[animationFrameIndex] || [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const boxId = `${i}_${j}`;
        let boxClass =
          currentFrame[i] && currentFrame[i][j] ? "box on" : "box off";

        rowsArr.push(<Box boxClass={boxClass} key={boxId} id={boxId} />);
      }
    }
  } else {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const boxId = `${i}_${j}`;
        let boxClass = gridFull[i][j] ? "box on" : "box off";

        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            id={boxId}
            row={i}
            col={j}
            selectBox={selectBox}
          />
        );
      }
    }
  }

  return (
    <div
      className={`w-[${width}px] leading-[0] shadow-[0px_0px_20px_white] mt-5`}
    >
      {rowsArr}
    </div>
  );
}
