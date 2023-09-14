import React from "react";

const Progress = ({ index, numOfQuestions, points, questions, answer }) => {
  const allThePoints = questions.reduce((index, acc) => index + acc.points, 0);
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {allThePoints}
      </p>
    </header>
  );
};

export default Progress;
