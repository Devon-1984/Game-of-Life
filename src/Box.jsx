import React from "react";

export default function Box({ boxClass, id, row, col, selectBox }) {
  const handleSelectBox = () => {
    selectBox(row, col);
  };

  return <div className={boxClass} id={id} onClick={handleSelectBox} />;
}
