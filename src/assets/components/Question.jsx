import React, { useState, useEffect } from "react";
import Answer from "./Answer";

export default function Question(props) {
  const { quizzes, handleClick, checkAnswers, isCheck, isLoading } = props;

  //   製作問題----------------------------------------------------
  const allQuestions = quizzes.map((quiz, quizIndex) => {
    const { question, allAnswers } = quiz;
    //渲染按鈕
    let allButtons = allAnswers.map((answer) => {
      return (
        <Answer
          answerText={answer.answerText}
          id={answer.id}
          key={answer.id}
          isSelected={answer.isSelected}
          isCorrect={answer.isCorrect}
          isCheck={isCheck}
          isWrongGuess={answer.isWrongGuess}
          handleClick={() => handleClick(answer.id)}
        />
      );
    });
    return (
      <div className="question-container" key={quizIndex}>
        <p className="question">{question}</p>
        <div className="answers">{allButtons}</div>
      </div>
    );
  });

  return (
    <div className="question-board">
      {isLoading && <div className="loadingText">Loading...</div>}
      {!isLoading && (
        <React.Fragment>
          {allQuestions}
          <div className="button-container">
            <button className="check-button" onClick={checkAnswers}>
              {props.isCheck ? "Play again" : "Check answers"}
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
