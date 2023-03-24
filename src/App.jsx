import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import StartBoard from "./assets/components/StartBoard";
import Question from "./assets/components/Question";
import imageTopRight from "./assets/images/blob1.png";
import imageBottomLeft from "./assets/images/blob2.png";

export default function App() {
  const [start, setStart] = useState(false);
  const [playTimes, setPlayTimes] = useState(1);
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      console.log(`isLoading: ${isLoading}`);
      setIsLoading((prev) => !prev);
      console.log(`isLoading: ${isLoading}`);
      const quizzesWithId = await data.results.map((quiz) => {
        return {
          question: quiz.question,
          correctAnswer: {
            answerText: quiz.correct_answer,
            id: nanoid(),
            isSelected: false,
            isCorrect: true,
            isWrongGuess: false
          },
          incorrectAnswers: quiz.incorrect_answers.map((answer) => {
            return {
              answerText: answer,
              id: nanoid(),
              isSelected: false,
              isCorrect: false,
              isWrongGuess: false
            };
          })
        };
      });

      const shuffledQuizzes = await shuffleAnswers();
      // console.log(shuffledQuizzes);
      setQuizzes(shuffledQuizzes);

      function shuffleAnswers() {
        const newQuizzes = quizzesWithId.map((quiz) => {
          let combinedAnswers = [...quiz.incorrectAnswers, quiz.correctAnswer];
          let shuffledAnswers = combinedAnswers.sort(() => Math.random() - 0.5);
          let newQuiz = { ...quiz, allAnswers: shuffledAnswers };
          return newQuiz;
        });
        return newQuizzes;
      }
    };
    fetchData();
    setIsLoading((prev) => !prev);
  }, [playTimes]);

  // ----------------------------functions-------------------------------------
  function handleClick(id) {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) => {
        if (quiz.allAnswers.some((item) => item.id == id)) {
          const newAnswers = quiz.allAnswers.map((answer) =>
            answer.id === id
              ? { ...answer, isSelected: !answer.isSelected }
              : { ...answer, isSelected: false }
          );
          return { ...quiz, allAnswers: newAnswers };
        } else {
          return quiz;
        }
      })
    );
  }

  function checkAnswers() {
    setIsCheck((prev) => !prev);
    setQuizzes((prev) =>
      prev.map((quiz) => {
        return {
          ...quiz,
          allAnswers: quiz.allAnswers.map((answer) => {
            if (answer.isSelected) {
              if (answer !== quiz.correctAnswer) {
                return {
                  ...answer,
                  isWrongGuess: true
                };
              }
            }
            return answer;
          })
        };
      })
    );
    setPlayTimes((prev) => (isCheck ? prev + 1 : prev));
  }

  // ----------------------------functions-------------------------------------
  return (
    <div className="app">
      {start ? (
        <Question
          quizzes={quizzes}
          handleClick={handleClick}
          checkAnswers={checkAnswers}
          isCheck={isCheck}
          isLoading={isLoading}
        />
      ) : (
        <StartBoard setStart={setStart} />
      )}
      <img src={imageTopRight} alt="" className="blob1" />
      <img src={imageBottomLeft} alt="" className="blob2" />
    </div>
  );
}
