import React from "react";
import Options from "./Options";
const Questions = ({
  question,
  onAnswer,
  answer,
  points,
  handlerpagination,
}) => {
  return (
    <>
      <h4>{question.question}</h4>
      <Options
        question={question}
        onAnswer={onAnswer}
        answer={answer}
        points={points}
        handlerpagination={handlerpagination}
      />
    </>
  );
};

export default Questions;
