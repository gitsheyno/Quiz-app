import React from "react";

const Options = ({ question, onAnswer, answer, points, handlerpagination }) => {
  const hanlder = (index) => {
    onAnswer(index, question.correctOption, question.points);
  };
  return (
    <div className="options">
      <p className="point">{points}</p>
      {question.options.map((option, index) => (
        <button
          disabled={answer !== null}
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => hanlder(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
