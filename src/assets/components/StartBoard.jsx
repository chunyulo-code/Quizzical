import React from "react";

export default function StartBoard(props) {
  function handleClick() {
    props.setStart(true);
    console.log("Game started");
  }
  return (
    <div className="start-board">
      <h2 className="gameName">Quizzical</h2>
      <p className="description">Some descripition if needed</p>
      <button className="startBtn" onClick={handleClick}>
        Start quiz
      </button>
    </div>
  );
}
