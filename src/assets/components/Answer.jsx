import React from "react";

export default function Answer(props) {
  const selectedStyle = {
    backgroundColor: props.isSelected ? "#D6DBF5" : "transparent",
    border: props.isSelected ? "none" : "1px solid #4d5b9e"
  };
  const correctAnswerStyle = {
    backgroundColor: props.isCorrect ? "#94D7A2" : "transparent",
    border: props.isCorrect ? "none" : "1px solid #4d5b9e"
  };
  const inCorrectAnswerStyle = {
    backgroundColor: props.isWrongGuess ? "#F8BCBC" : "transparent",
    border: props.isWrongGuess ? "none" : "1px solid #4d5b9e"
  };
  const styles = props.isCheck
    ? props.isCorrect
      ? correctAnswerStyle
      : inCorrectAnswerStyle
    : selectedStyle;

  return (
    <button
      className="answer-button"
      style={styles}
      onClick={props.handleClick}
    >
      {props.answerText}
    </button>
  );
}
